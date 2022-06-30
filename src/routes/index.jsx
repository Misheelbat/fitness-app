import { useRoutes, Navigate } from 'react-router-dom';

import { useAuth } from 'features/auth';
import { Landing } from 'features/misc';
import { PageSpinner } from 'components/Elements';

import { protectedRoutes } from './protected';
import { publicRoutes } from './public';

export const AppRoutes = () => {
	const { currentUser } = useAuth();

	const commenRoutes = [
		{
			path: '',
			element: <Landing />,
			children: [
				{ path: '*', element: <PageSpinner size="100" variant="primary" /> },
			],
		},
	];

	const routes = currentUser ? protectedRoutes : publicRoutes;

	const element = useRoutes([...routes, ...commenRoutes]);
	return <>{element}</>;
};
