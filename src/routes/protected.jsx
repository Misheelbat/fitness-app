import { Suspense } from 'react';
import { Outlet, Navigate } from 'react-router-dom';

import { lazyImport } from 'utils';
import { PageSpinner } from 'components/Elements';
import { MainLayout } from 'components/Layout';

const { UserRoutes } = lazyImport(() => import('features/users'), 'UserRoutes');
const { ExercisesRoutes } = lazyImport(
	() => import('features/exercises'),
	'ExercisesRoutes'
);
const { WorkoutRoutes } = lazyImport(
	() => import('features/workout'),
	'WorkoutRoutes'
);

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
			{ path: 'exercises/*', element: <ExercisesRoutes /> },
			{ path: 'workouts/*', element: <WorkoutRoutes /> },
			{ path: 'schedule', element: <div>Schedule</div> },
			{ path: 'profile/*', element: <UserRoutes /> },
			{ path: '', element: <div>dashboard</div> },
			{ path: '*', element: <Navigate to="." /> },
		],
	},
];
