import { useEffect } from 'react';
import { useRoutes } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectDisplayName, useLazyIsUserAuthenticatedQuery } from 'features/auth';

import { Landing } from 'features/misc';
import { PageSpinner } from 'components/Elements';

import { protectedRoutes } from './protected';
import { publicRoutes } from './public';

export const AppRoutes = () => {
	const user = useSelector(selectDisplayName);
	const [isUserAuthenticated, { isLoading }] = useLazyIsUserAuthenticatedQuery();

	useEffect(() => {
		isUserAuthenticated();
	}, [isUserAuthenticated]);

	const commenRoutes = [
		{
			path: '',
			element: isLoading ? <PageSpinner /> : <Landing />,
			children: [{ path: '/*', element: <PageSpinner /> }],
		},
	];

	const routes = user ? protectedRoutes : publicRoutes;
	const element = useRoutes([...routes, ...commenRoutes]);
	return <>{element}</>;
};
