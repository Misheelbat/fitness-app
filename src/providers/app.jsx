import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter } from 'react-router-dom';

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
		<Suspense fallback={<div>Spinnger</div>}>
			<ErrorBoundary FallbackComponent={ErrorFallBack}>
				<BrowserRouter>{children}</BrowserRouter>
			</ErrorBoundary>
		</Suspense>
	);
};
