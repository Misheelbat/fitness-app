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
		alert('password must be identical');
		return;
	}
	const res = await createUserWithEmailAndPassword(auth, email, password);

	await updateProfile(res.user, { displayName });
	return res;
};
