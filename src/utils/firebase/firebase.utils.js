import { initializeApp } from 'firebase/app';
import {
	getAuth,
	// eslint-disable-next-line
	connectAuthEmulator,
} from 'firebase/auth';

import { getFirestore } from 'firebase/firestore';

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
