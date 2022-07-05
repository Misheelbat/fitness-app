import {
	render as rtlRender,
	waitForElementToBeRemoved,
	screen,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { AppProvider } from 'providers/app';

export const waitForLoadingToFinish = () =>
	waitForElementToBeRemoved(() => [...screen.queryAllByTestId('loading')], {
		timeout: 4000,
	});

export const customRender = async (ui, options) => {
	window.history.pushState({}, 'Test page', '/');

	const returnValue = {
		...rtlRender(ui, { wrapper: AppProvider, ...options }),
	};

	await waitForLoadingToFinish();
	return returnValue;
};
export * from '@testing-library/react';
export { userEvent };
