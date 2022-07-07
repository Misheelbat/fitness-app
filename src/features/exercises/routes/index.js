import { Route, Routes } from 'react-router-dom';
import { Exercises } from './Exercises/Exercises';
import { Exercise } from './Exercise/Exercise';

export const ExercisesRoutes = () => {
	return (
		<Routes>
			<Route path="" element={<Exercises />} />
			<Route path=":exerciseId" element={<Exercise />} />
		</Routes>
	);
};
