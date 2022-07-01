import { updateProfile, updateEmail, updatePassword } from 'firebase/auth';
import { auth } from 'utils';

export const updateUserEmail = (email) => {
	if (email === auth.currentUser.email) {
		throw new Error('Entered email must be new');
	}
	return updateEmail(auth.currentUser, email);
};

export const updateUserPassword = (password, confirmPassword) => {
	if (password !== confirmPassword) {
		throw new Error('Passwords do not match');
	}
	return updatePassword(auth.currentUser, password);
};

export const updateUserDisplayName = (name) => {
	if (name === auth.currentUser.displayName) {
		throw new Error('Entered username must be new');
	}
	return updateProfile(auth.currentUser, { displayName: name });
};
