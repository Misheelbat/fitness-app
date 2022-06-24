import { Suspense } from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const App = () => {
	return (
		<Suspense fallback={<div>Spinner</div>}>
			<Outlet />
		</Suspense>
	);
};

export const protectedRoutes = [
	{
		path: '/app',
		element: <App />,
		children: [
			{ path: '/exercises', element: <div>Exercise</div> },
			{ path: '/programm', element: <div>Programm</div> },
			{ path: '/schedule', element: <div>Schedule</div> },
			{ path: '/', element: <div>Home</div> },
			{ path: '*', element: <Navigate to="." /> },
		],
	},
];
