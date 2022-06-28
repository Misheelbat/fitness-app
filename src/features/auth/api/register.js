import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from 'utils';

export const createAuthUserWithEmailAndPassword = async ({
	email,
	password,
}) => {
	if (!email || !password) return;
	return await createUserWithEmailAndPassword(auth, email, password);
};
