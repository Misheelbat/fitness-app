import { Routes, Route } from 'react-router-dom';

import { Login } from './Login/Login';
import { Register } from './Register/Register';
import { ResetPass } from './ResetPass/ResetPass';

export const AuthRoutes = () => {
	return (
		<Routes>
			<Route path="register" element={<Register />} />
			<Route path="login" element={<Login />} />
			<Route path="forgotPassword" element={<ResetPass />} />
		</Routes>
	);
};
