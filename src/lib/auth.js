import { initReactQueryAuth } from 'react-query-auth';

import { signoutUser, onAuthStateListener } from 'utils';
import {
	loginAuthUserWithEmailAndPassword,
	registerWithEmailAndPassword,
	getUser,
} from 'features/auth';
import { Spinner } from 'components/Elements';

async function handleUserResponse(data) {
	const { user } = data;
	return user;
}

async function loadUser() {
	const data = getUser();
	console.log(data);
	return data;
}

async function loginFn(data) {
	const response = await loginAuthUserWithEmailAndPassword(data);
	const { displayName, email } = await handleUserResponse(response);

	return { displayName, email };
}

async function registerFn(data) {
	const response = await registerWithEmailAndPassword(data);
	const { displayName, email } = await handleUserResponse(response);
	return { displayName, email };
}
async function logoutFn() {
	await signoutUser();
	window.location.assign(window.location.origin);
	console.log('user logged out');
}

const authConfig = {
	loadUser,
	loginFn,
	registerFn,
	logoutFn,
	LoaderComponent() {
		return (
			<div style={{ display: 'grid', placeContent: 'center', height: '100vh' }}>
				<Spinner size="80" />
			</div>
		);
	},
};

export const { AuthProvider, useAuth } = initReactQueryAuth(authConfig);
