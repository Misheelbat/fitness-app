import { useEffect } from 'react';
import { useDispatch } from 'react-redux/es/exports';

import { createUserFromAuth, onAuthStateListener } from 'utils';
import { setCurrentUser } from 'features/auth';

import { useRoutes } from 'react-router-dom';

import { Landing } from 'features/misc';

import { protectedRoutes } from './protected';
import { publicRoutes } from './public';

export const AppRoutes = ({ auth = false }) => {
	const dispatch = useDispatch();
	useEffect(() => {
		const unsub = onAuthStateListener((user) => {
			if (user) {
				createUserFromAuth(user);
			}
			dispatch(setCurrentUser(user));
		});
		return unsub;
	}, []);
	const commenRoutes = [{ path: '', element: <Landing /> }];

	const routes = auth ? protectedRoutes : publicRoutes;

	const element = useRoutes([...routes, ...commenRoutes]);
	return <>{element}</>;
};
