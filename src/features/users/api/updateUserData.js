import { auth } from 'utils';
import { updateProfile, updateEmail, updatePassword } from 'firebase/auth';

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
