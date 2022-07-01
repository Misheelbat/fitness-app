import { initializeApp } from 'firebase/app';
import {
	getAuth,
	signInWithPopup,
	GoogleAuthProvider,
	signOut,
	onAuthStateChanged,
	sendPasswordResetEmail,
} from 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyBVDqbPR5BnRj_vRnFybI-FLRKYP6-WuZI',
	authDomain: 'fitness-app-31114.firebaseapp.com',
	projectId: 'fitness-app-31114',
	storageBucket: 'fitness-app-31114.appspot.com',
	messagingSenderId: '396836325331',
	appId: '1:396836325331:web:fac3bde758e86f9d9a1126',
};

const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase Database
// export const firestoreDB = getFirestore();

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
	prompt: 'select_account',
});

export const auth = getAuth(firebaseApp);
export const signWithGooglePopup = () => signInWithPopup(auth, googleProvider);

export const signoutUser = () => signOut(auth);

export const onAuthStateListener = (callback) =>
	onAuthStateChanged(auth, callback);

export const resetPassWithEmail = (email) =>
	sendPasswordResetEmail(auth, email);
