import { initReactQueryAuth } from 'react-query-auth';
import { updateProfile } from 'firebase/auth';

import { signoutUser, createUserFromAuth } from 'utils';
import {
	loginAuthUserWithEmailAndPassword,
	registerWithEmailAndPassword,
} from 'features/auth';

import { Spinner } from 'components/Elements';

async function handleUserResponse(data) {
	const { user } = data;
	return user;
}

async function loadUser() {
	return null;
}

async function loginFn(data) {
	const response = await loginAuthUserWithEmailAndPassword(data);
	const user = await handleUserResponse(response);
	return user;
}

async function registerFn(data) {
	const { email, password, displayName } = data;
	const response = await registerWithEmailAndPassword({
		email,
		password,
	});

	const user = await handleUserResponse(response);
	await updateProfile(user, { displayName });
	await createUserFromAuth(user, { displayName });
	return user;
}
async function logoutFn() {
	await signoutUser();
	console.log('user logged out');
}

const authConfig = {
	loadUser,
	loginFn,
	registerFn,
	logoutFn,
	LoaderComponent() {
		return (
			<div>
				<Spinner size="30" />
			</div>
		);
	},
};

export const { AuthProvider, useAuth } = initReactQueryAuth(authConfig);
