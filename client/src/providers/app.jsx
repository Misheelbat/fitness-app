import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { reduxStore } from 'store';
import { ToastProvider } from 'components/ToastContainer';

import { ErrorFallBack } from 'features/misc';
import { PageSpinner } from 'components/Elements';

export const AppProvider = ({ children }) => {
	return (
		<Suspense fallback={<PageSpinner />}>
			<ErrorBoundary FallbackComponent={ErrorFallBack}>
				<HelmetProvider>
						<Provider store={reduxStore}>
							<BrowserRouter>{children}</BrowserRouter>
							<ToastProvider />
						</Provider>
				</HelmetProvider>
			</ErrorBoundary>
		</Suspense>
	);
};
