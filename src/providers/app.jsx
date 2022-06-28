import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { queryClient } from 'lib/react-query';
import { AuthProvider } from 'lib/auth';

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
					<QueryClientProvider client={queryClient}>
						<ReactQueryDevtools />
						<AuthProvider>
							<BrowserRouter>{children}</BrowserRouter>
						</AuthProvider>
					</QueryClientProvider>
				</HelmetProvider>
			</ErrorBoundary>
		</Suspense>
	);
};
