import { updateProfile, updateEmail, updatePassword } from 'firebase/auth';
import { auth } from 'utils';

export const updateUserEmail = (email) => updateEmail(auth.currentUser, email);

export const updateUserPassword = (pass) =>
	updatePassword(auth.currentUser, pass);

export const updateUserDisplayName = (name) =>
	updateProfile(auth.currentUser, { displayName: name });
