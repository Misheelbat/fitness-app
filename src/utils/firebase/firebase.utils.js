import { initializeApp } from 'firebase/app';
import {
	getAuth,
	signOut,
	onAuthStateChanged,
	sendPasswordResetEmail,
	// eslint-disable-next-line
	connectAuthEmulator,
} from 'firebase/auth';

import {
	getFirestore,
	doc,
	getDoc,
	setDoc,
	collection,
	writeBatch,
	query,
	getDocs,
	updateDoc,
	arrayUnion,
} from 'firebase/firestore';

const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
	storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);

const firestoreDb = getFirestore();

// if (window.location.hostname === 'localhost') {
// 	connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
// }

// Firebase Functions

export const signoutUser = () => signOut(auth);

export const onAuthStateListener = (callback) =>
	onAuthStateChanged(auth, callback);

export const resetPassWithEmail = (email) =>
	sendPasswordResetEmail(auth, email);

export const getCurrentUser = () => {
	return new Promise((resolve, reject) => {
		const unsubscribe = onAuthStateChanged(
			auth,
			(userAuth) => {
				unsubscribe();
				resolve(userAuth);
			},
			reject
		);
	});
};

// database
export const createUserDocFromAuth = async (userAuth) => {
	if (!userAuth) return;
	const userDocRef = doc(firestoreDb, 'users', userAuth.uid);
	const userSnapshot = await getDoc(userDocRef);

	if (!userSnapshot.exists()) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();
		try {
			await setDoc(userDocRef, { displayName, email, createdAt, workout: [] });
		} catch (error) {
			console.log('could not save user to db', error.message);
		}
	}

	return userDocRef;
};

export const addCollectionAndDocs = async (docsToAdd) => {
	const key = auth.currentUser.uid;
	const collectionRef = collection(firestoreDb, key);
	const batch = writeBatch(firestoreDb);
	docsToAdd.forEach((object) => {
		const docRef = doc(collectionRef, object.title);
		batch.set(docRef, object);
	});
	await batch.commit();
	console.log('batch done');
};

export const addWorkout = async (docsToAdd) => {
	const key = auth.currentUser.uid;
	const collectionRef = collection(firestoreDb, 'users');
	const docRef = doc(firestoreDb, 'users', key);
	await updateDoc(docRef, {
		workout: docsToAdd,
	});
	console.log('batch done');
};

export const getWorkoutsDoc = async () => {
	const collectionRef = collection(firestoreDb, 'workout');
	const q = query(collectionRef);
	const querySnapshot = await getDocs(q);
	const workoutsMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
		const { id, items } = docSnapshot.data();
		acc[id] = items;
		return acc;
	}, {});
	return workoutsMap;
};
