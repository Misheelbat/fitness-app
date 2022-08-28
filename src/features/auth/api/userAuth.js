import { signOut, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from 'utils';

export const signoutUser = () => signOut(auth);

export const getUser = () => auth.currentUser;

export const resetPassWithEmail = (email) =>
	sendPasswordResetEmail(auth, email);
