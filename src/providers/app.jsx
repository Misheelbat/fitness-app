import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { AuthProvider } from 'features/auth';
import { ToastProvider } from 'components/ToastContainer';
import { queryClient } from 'lib';

import { ErrorFallBack } from 'features/misc';
import { PageSpinner } from 'components/Elements';

export const AppProvider = ({ children }) => {
	return (
		<Suspense fallback={<PageSpinner />}>
			<ErrorBoundary FallbackComponent={ErrorFallBack}>
				<HelmetProvider>
					<QueryClientProvider client={queryClient}>
						<AuthProvider>
							<BrowserRouter>{children}</BrowserRouter>
							<ToastProvider />
							<ReactQueryDevtools />
						</AuthProvider>
					</QueryClientProvider>
				</HelmetProvider>
			</ErrorBoundary>
		</Suspense>
	);
};
