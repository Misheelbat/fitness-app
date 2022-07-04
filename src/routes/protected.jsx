import { Suspense } from 'react';
import { Outlet, Navigate } from 'react-router-dom';

import { lazyImport } from 'utils/lazyImport';
import { PageSpinner } from 'components/Elements';
import { MainLayout } from 'components/Layout';

const { UserRoutes } = lazyImport(() => import('features/users'), 'UserRoutes');

const App = () => {
	return (
		<MainLayout>
			<Suspense fallback={<PageSpinner />}>
				<Outlet />
			</Suspense>
		</MainLayout>
	);
};

export const protectedRoutes = [
	{
		path: 'app',
		element: <App />,
		children: [
			{ path: 'exercises', element: <div>Exercise</div> },
			{ path: 'programms', element: <div>Programm</div> },
			{ path: 'schedule', element: <div>Schedule</div> },
			{ path: 'profile/*', element: <UserRoutes /> },
			{ path: '', element: <div>dashboard</div> },
			{ path: '*', element: <Navigate to="." /> },
		],
	},
];
