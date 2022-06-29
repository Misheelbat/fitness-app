import { useRoutes } from 'react-router-dom';

import { Landing } from 'features/misc';
import { useAuth } from 'lib';

import { protectedRoutes } from './protected';
import { publicRoutes } from './public';

export const AppRoutes = () => {
	const { user } = useAuth();

	const commenRoutes = [{ path: '', element: <Landing /> }];
	const routes = user ? protectedRoutes : publicRoutes;

	const element = useRoutes([...routes, ...commenRoutes]);
	return <>{element}</>;
};
