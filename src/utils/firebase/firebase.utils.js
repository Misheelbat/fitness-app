import { initializeApp } from 'firebase/app';
import {
	getAuth,
	signOut,
	onAuthStateChanged,
	sendPasswordResetEmail,
	// eslint-disable-next-line
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

export const auth = getAuth(firebaseApp);

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
