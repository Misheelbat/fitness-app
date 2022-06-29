import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from 'utils';

export const registerWithEmailAndPassword = async ({
	displayName,
	email,
	password,
	confirmPassword,
}) => {
	if (!email || !password) return;
	if (password !== confirmPassword) {
		throw new Error('Passwords do not match');
	}
	const res = await createUserWithEmailAndPassword(auth, email, password);

	await updateProfile(res.user, { displayName });
	return res;
};
