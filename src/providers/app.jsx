import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store } from '../stores/store';
const ErrorFallBack = () => {
	return (
		<div>
			<h2>Oops, something went wrong :( </h2>
			<button>Refresh</button>
		</div>
	);
};

export const AppProvider = ({ children }) => {
	return (
		<Suspense fallback={<div>Spinner</div>}>
			<ErrorBoundary FallbackComponent={ErrorFallBack}>
				<HelmetProvider>
					<Provider store={store}>
						<BrowserRouter>{children}</BrowserRouter>
					</Provider>
				</HelmetProvider>
			</ErrorBoundary>
		</Suspense>
	);
};
