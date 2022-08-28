import { auth } from 'utils';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

export const registerWithEmailAndPassword = async ({
	displayName,
	email,
	password,
	confirmPassword,
}) => {
	if (!email || !password) {
		throw new Error('(/Password or Email missing!)');
	} else if (password !== confirmPassword) {
		throw new Error('(/Passwords do not match!)');
	}
	const { user } = await createUserWithEmailAndPassword(auth, email, password);
	await updateProfile(user, { displayName });
	await user.reload();
	return user;
};
