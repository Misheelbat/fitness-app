import { initializeApp } from 'firebase/app';
import {
	getAuth,
	signInWithPopup,
	GoogleAuthProvider,
	signOut,
	onAuthStateChanged,
	sendPasswordResetEmail,
	connectAuthEmulator,
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
export const auth = getAuth(firebaseApp);

if (window.location.hostname === 'localhost') {
	connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
}

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
	prompt: 'select_account',
});

export const signWithGooglePopup = () => signInWithPopup(auth, googleProvider);

export const signoutUser = () => signOut(auth);

export const onAuthStateListener = (callback) =>
	onAuthStateChanged(auth, callback);

export const resetPassWithEmail = (email) =>
	sendPasswordResetEmail(auth, email);

const url =
	'http://localhost:9099/emulator/v1/projects/fitness-app-31114/accounts';
	
export const clearAllUser = async () => {
	const res = await fetch(url, { method: 'DELETE' });
	if (res.status !== 200) {
		console.log('could not delete');
	}
};
