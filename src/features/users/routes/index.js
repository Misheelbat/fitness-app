import { Route, Routes } from 'react-router-dom';
import { UpdateProfile } from '../components/UpdateProfile/UpdateProfile';
import { Profile } from './Profile/Profile';

export const UserRoutes = () => {
	return (
		<Routes>
			<Route index element={<Profile />} />
			<Route path="update" element={<UpdateProfile />} />
		</Routes>
	);
};
