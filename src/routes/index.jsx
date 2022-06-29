import { useRoutes, Navigate } from 'react-router-dom';

import { useAuth } from 'features/auth';
import { Landing } from 'features/misc';

import { protectedRoutes } from './protected';
import { publicRoutes } from './public';

export const AppRoutes = () => {
	const { currentUser } = useAuth();

	const commenRoutes = [
		{
			path: '',
			element: <Landing />,
			children: [
				{ path: '*', element: <Navigate to={currentUser ? '.' : 'app'} /> },
			],
		},
	];
	const routes = currentUser ? protectedRoutes : publicRoutes;

	const element = useRoutes([...routes, ...commenRoutes]);
	return <>{element}</>;
};
