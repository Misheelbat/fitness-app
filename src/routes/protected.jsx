import { Suspense } from 'react';
import { Outlet, Navigate } from 'react-router-dom';

import { MainLayout } from 'components/Layout';

const App = () => {
	return (
		<MainLayout>
			<Suspense fallback={<div>Spinner</div>}>
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
			{ path: 'profile', element: <div>profile</div> },
			{ path: '', element: <div>Home</div> },
			{ path: '*', element: <Navigate to="." /> },
		],
	},
];
