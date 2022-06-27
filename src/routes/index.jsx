import { useRoutes } from 'react-router-dom';

import { Landing } from 'features/misc';

import { protectedRoutes } from './protected';
import { publicRoutes } from './public';

export const AppRoutes = ({ auth = false }) => {
	const commenRoutes = [{ path: '', element: <Landing /> }];

	const routes = auth ? protectedRoutes : publicRoutes;
	const element = useRoutes([...routes, ...commenRoutes]);
	return <>{element}</>;
};
