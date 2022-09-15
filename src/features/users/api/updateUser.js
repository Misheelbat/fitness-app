import { doc, getDoc, setDoc } from 'firebase/firestore';
import { updateProfile, updateEmail, updatePassword, onAuthStateChanged } from 'firebase/auth';
import { auth, firestoreDb } from 'utils';

export const updateUserEmail = async (email) => {
	if (email === auth.currentUser.email) {
		throw new Error('(/Entered email must be new)');
	}
	return await updateEmail(auth.currentUser, email);
};

export const updateUserPassword = async (pass) => {
	return await updatePassword(auth.currentUser, pass);
};

export const updateUserDisplayName = async (name) => {
	if (name === auth.currentUser.displayName) {
		throw new Error('(/Entered username must be new)');
	}
	return await updateProfile(auth.currentUser, { displayName: name });
};

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
				schedules: {},
			});
		} catch (error) {
			console.log('could not save user to db', error.message);
		}
	}

	return userSnapshot;
};
