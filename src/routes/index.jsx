import { useRoutes } from 'react-router-dom';

import { protectedRoutes } from './protected';
import { publicRoutes } from './public';

export const AppRoutes = ({ auth = true }) => {
	const commenRoutes = [{ path: '', element: <div>Welcome</div> }];

	const routes = auth ? protectedRoutes : publicRoutes;
	const element = useRoutes([...routes, ...commenRoutes]);
	return <>{element}</>;
};
