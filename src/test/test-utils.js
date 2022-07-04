import {
	render as rtlRender,
	waitForElementToBeRemoved,
	screen,
} from '@testing-library/react';
import { AppProvider } from 'providers/app';

export const waitForLoadingToFinish = () =>
	waitForElementToBeRemoved(() => [...screen.queryAllByTestId('loading')], {
		timeout: 4000,
	});

export const render = async (ui, options) => {
	window.history.pushState({}, 'Test page', '/');

	const returnValue = {
		...rtlRender(ui, { wrapper: AppProvider, ...options }),
	};

	await waitForLoadingToFinish();
	return returnValue;
};
