import {
	render as rtlRender,
	waitForElementToBeRemoved,
	screen,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { AppProvider } from 'providers/app';
import {
	registerWithEmailAndPassword,
	loginAuthUserWithEmailAndPassword,
} from 'features/auth';
import { userData } from './data-generators';

const FB_EMULATOR_URI = process.env.REACT_APP_FIREBASE_EMULATOR_URI;

export const waitForLoadingToFinish = () =>
	waitForElementToBeRemoved(() => [...screen.queryAllByTestId('loading')], {
		timeout: 4000,
	});

export const customRender = async (ui, options) => {
	// window.history.pushState({}, 'Test page', '/');

	const returnValue = {
		...rtlRender(ui, { wrapper: AppProvider, ...options }),
	};

	await waitForLoadingToFinish();
	return returnValue;
};

export const createNewUser = async (userInput = userData) => {
	const user = await registerWithEmailAndPassword(userInput);
	return user;
};

export const loginAsUser = async (userInput = userData) => {
	const user = await loginAuthUserWithEmailAndPassword(userInput);
	return user;
};

export const clearUserDb = async () => {
	const res = await fetch(FB_EMULATOR_URI, { method: 'DELETE' });
	if (res.status !== 200) {
		throw new Error('could not register user');
	}
};

export * from '@testing-library/react';
export { userEvent };
