import { initializeApp } from 'firebase/app';
import {
	getAuth,
	signInWithPopup,
	GoogleAuthProvider,
	signOut,
	onAuthStateChanged,
} from 'firebase/auth';

import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
// Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyBVDqbPR5BnRj_vRnFybI-FLRKYP6-WuZI',
	authDomain: 'fitness-app-31114.firebaseapp.com',
	projectId: 'fitness-app-31114',
	storageBucket: 'fitness-app-31114.appspot.com',
	messagingSenderId: '396836325331',
	appId: '1:396836325331:web:fac3bde758e86f9d9a1126',
};
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase Database
export const firestoreDB = getFirestore();

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
	prompt: 'select_account',
});

export const auth = getAuth();
export const signWithGooglePopup = () => signInWithPopup(auth, googleProvider);

// save/create user to database
export const createUserFromAuth = async (userAuth, additionalInfo) => {
	if (!userAuth) return;
	// get userDoc if it doesn't exist create one
	const userDocRef = doc(firestoreDB, 'users', userAuth.uid);
	const userSnapshot = await getDoc(userDocRef);

	// run if the user doesn't exist
	if (!userSnapshot.exists()) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await setDoc(userDocRef, {
				displayName,
				email,
				createdAt,
				...additionalInfo,
			});
		} catch (error) {
			console.log('error creating a user', error.message);
		}
		return userDocRef;
	}
};

export const signoutUser = () => signOut(auth);
export const onAuthStateListener = (callback) =>
	onAuthStateChanged(auth, callback);
