import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from 'utils';

export const registerWithEmailAndPassword = async ({
	email,
	password,
	confirmPassword,
}) => {
	if (!email || !password) return;
	if (password !== confirmPassword) {
		alert('password must be identical');
		return;
	}
	return await createUserWithEmailAndPassword(auth, email, password);
};
