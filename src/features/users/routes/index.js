import { useSelector } from 'react-redux';
import { Route, Routes, Navigate } from 'react-router-dom';

import { Profile } from './Profile/Profile';
import { UpdateProfile } from '../components/UpdateProfile/UpdateProfile';
import { selectDisplayName } from 'features/auth';

export const UserRoutes = () => {
	const displayName = useSelector(selectDisplayName);

	let availableRoutes;
	if (displayName === 'Guest') {
		availableRoutes = <Route path="*" element={<Navigate to="/app" />} />;
	} else {
		availableRoutes = (
			<>
				<Route index element={<Profile />} />
				<Route path="update" element={<UpdateProfile />} />
			</>
		);
	}

	return <Routes>{availableRoutes}</Routes>;
};
