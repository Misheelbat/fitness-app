import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from 'react-query';

import { AuthProvider } from 'features/auth';
import { ToastProvider } from 'components/ToastContainer';
import { ErrorFallBack } from 'features/misc';
import { queryClient } from 'lib';

export const AppProvider = ({ children }) => {
	return (
		<Suspense fallback={<div>Spinner</div>}>
			<ErrorBoundary FallbackComponent={ErrorFallBack}>
				<HelmetProvider>
					<QueryClientProvider client={queryClient}>
						<AuthProvider>
							<BrowserRouter>{children}</BrowserRouter>
							<ToastProvider />
						</AuthProvider>
					</QueryClientProvider>
				</HelmetProvider>
			</ErrorBoundary>
		</Suspense>
	);
};
