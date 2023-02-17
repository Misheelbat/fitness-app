import { Routes, Route } from 'react-router-dom';
import { Schedule } from './Schedule/Schedule';

export const ScheduleRoutes = () => {
	return (
		<Routes>
			<Route path="" element={<Schedule />} />
		</Routes>
	);
};
