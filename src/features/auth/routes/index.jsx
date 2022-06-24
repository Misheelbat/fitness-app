
import { Routes, Route } from 'react-router-dom';
export const AuthRoutes = () => {
	return (
		<Routes>
			<Route path="register" element={<div>register</div>} />
			<Route path="login" element={<div>login</div>} />
		</Routes>
	);
};
