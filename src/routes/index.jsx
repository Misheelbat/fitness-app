import { useEffect } from 'react';
import { useRoutes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useLazyIsUserAuthenticatedQuery } from 'features/auth';

import { selectDisplayName } from 'features/auth';
import { Landing } from 'features/misc';
import { PageSpinner } from 'components/Elements';

import { protectedRoutes } from './protected';
import { publicRoutes } from './public';

export const AppRoutes = () => {
	const user = useSelector(selectDisplayName);
	const [trigger, { isFetching }] = useLazyIsUserAuthenticatedQuery();

	useEffect(() => {
		trigger();
		// eslint-disable-next-line
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
	return <>{isFetching ? <PageSpinner /> : element}</>;
};
