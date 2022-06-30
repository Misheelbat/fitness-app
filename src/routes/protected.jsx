import { Suspense } from 'react';
import { Outlet, Navigate } from 'react-router-dom';

import { PageSpinner } from 'components/Elements';
import { MainLayout } from 'components/Layout';
import { UserRoutes } from 'features/users';
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
		path: '/app',
		element: <App />,
		children: [
			{ path: 'exercises', element: <div>Exercise</div> },
			{ path: 'programm', element: <div>Programm</div> },
			{ path: 'schedule', element: <div>Schedule</div> },
			{ path: 'profile/*', element: <UserRoutes /> },
			{ path: '', element: <div>Home</div> },
			{ path: '*', element: <Navigate to="." /> },
		],
	},
];
