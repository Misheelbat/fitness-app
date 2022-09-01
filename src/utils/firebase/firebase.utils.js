import { initializeApp } from 'firebase/app';
import {
	getAuth,
	onAuthStateChanged,
	// eslint-disable-next-line
	connectAuthEmulator,
} from 'firebase/auth';

import {
	getFirestore,
	doc,
	getDoc,
	setDoc,
	updateDoc,
	arrayUnion,
	arrayRemove,
	writeBatch,
	deleteField,
} from 'firebase/firestore';

const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
	storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// init firestore
const firebaseApp = initializeApp(firebaseConfig);

//init auth
export const auth = getAuth(firebaseApp);

//init firestoreDb
export const firestoreDb = getFirestore();

// if (window.location.hostname === 'localhost') {
// 	connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
// }

// check if user session exist
export const checkUserSession = () => {
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

// save user to db
export const createUserDocFromAuth = async (userAuth) => {
	if (!userAuth) return;
	const userDocRef = doc(firestoreDb, 'users', userAuth.uid);
	const userSnapshot = await getDoc(userDocRef);

	if (!userSnapshot.exists()) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();
		try {
			await setDoc(userDocRef, {
				displayName,
				email,
				createdAt,
				workout: { ids: [], entities: {} },
			});
		} catch (error) {
			console.log('could not save user to db', error.message);
		}
	}

	return userSnapshot;
};

export const addWorkout = async (id) => {
	const key = auth.currentUser.uid;
	const docRef = doc(firestoreDb, 'users', key);

	await updateDoc(docRef, {
		'workout.ids': arrayUnion(id),
		[`workout.entities.${id}`]: { id, exercises: { ids: [], entities: {} } },
	});
	console.log('addWorkout done');
};

export const getWorkoutsFromDb = async () => {
	const key = auth.currentUser.uid;
	const docRef = doc(firestoreDb, 'users', key);
	const docSnap = await getDoc(docRef);

	if (docSnap.exists()) {
		const workoutsMap = docSnap.data();
		return workoutsMap.workout;
	} else {
		console.log('No such document!');
	}
	return;
};

export const changeWorkoutTitle = async ({ id, data }) => {
	const key = auth.currentUser.uid;
	const docRef = doc(firestoreDb, 'users', key);
	const batch = writeBatch(firestoreDb);

	batch.update(docRef, {
		'workout.ids': arrayRemove(id),
	});
	batch.update(docRef, {
		'workout.ids': arrayUnion(data.id),
		[`workout.entities.${data.id}`]: data,
		[`workout.entities.${id}`]: deleteField(),
	});

	await batch.commit();
	console.log('changeWorkoutTitle done');
};

export const addExercise = async ({ title, data }) => {
	const key = auth.currentUser.uid;
	const docRef = doc(firestoreDb, 'users', key);
	await updateDoc(docRef, {
		[`workout.entities.${title}.id`]: title,
		[`workout.entities.${title}.exercises.ids`]: arrayUnion(data.id),
		[`workout.entities.${title}.exercises.entities.${data.id}`]: data,
	});
	console.log('addExerciseToWorkout done');
};

export const deleteExerciseFromDoc = async ({ id, workout }) => {
	const key = auth.currentUser.uid;
	const docRef = doc(firestoreDb, 'users', key);

	await updateDoc(docRef, {
		[`workout.entities.${workout}.exercises.ids`]: arrayRemove(id),
		[`workout.entities.${workout}.exercises.entities.${id}`]: deleteField(),
	});

	console.log('deleteExerciseFromDoc done');
};

export const deleteWorkoutFromDoc = async (id) => {
	const key = auth.currentUser.uid;
	const docRef = doc(firestoreDb, 'users', key);

	await updateDoc(docRef, {
		[`workout.ids`]: arrayRemove(id),
		[`workout.entities.${id}`]: deleteField(),
	});

	console.log('deleteExerciseFromDoc done');
};
