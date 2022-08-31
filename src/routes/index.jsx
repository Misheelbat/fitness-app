import { useEffect } from 'react';
import { useRoutes } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { reduxStore } from 'store';
import { selectDisplayName, authApi, useIsUserAuthenticatedQuery } from 'features/auth';

import { Landing } from 'features/misc';
import { PageSpinner } from 'components/Elements';

import { protectedRoutes } from './protected';
import { publicRoutes } from './public';

export const AppRoutes = () => {
	const user = useSelector(selectDisplayName);
	const { isLoading } = useIsUserAuthenticatedQuery();

	useEffect(() => {
		const userLogged = reduxStore.dispatch(authApi.endpoints.isUserAuthenticated.initiate());

		return () => {
			userLogged.unsubscribe();
		};
	}, []);

	const commenRoutes = [
		{
			path: '',
			element: <Landing />,
			children: [{ path: '/*', element: <PageSpinner /> }],
		},
	];

	const routes = user ? protectedRoutes : publicRoutes;
	const element = useRoutes([...routes, ...commenRoutes]);
	return <>{isLoading ? <PageSpinner /> : element}</>;
};
