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
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
	storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_FIREBASE_APP_ID,
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
