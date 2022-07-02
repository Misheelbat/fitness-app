import { signInWithEmailAndPassword, signInAnonymously } from 'firebase/auth';
import { auth } from 'utils';

export const loginAuthUserWithEmailAndPassword = async ({
	email,
	password,
}) => {
	if (!email || !password) return;

	return await signInWithEmailAndPassword(auth, email, password);
};

export const loginAnonymously = async () => {
	return await signInAnonymously(auth);
};
