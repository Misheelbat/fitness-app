import { Routes, Route } from 'react-router-dom';

import { Workout } from './Workout/Workout';
import { Workouts } from './Workouts/Workouts';

export const WorkoutRoutes = () => {
	return (
		<Routes>
			<Route path="" element={<Workouts />} />
			<Route path=":id" element={<Workout />} />
		</Routes>
	);
};
