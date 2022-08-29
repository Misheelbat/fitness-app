import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { ContentLayout } from 'components/Layout';
import { WorkoutTemplate } from '../../components/WorkoutTemplate/WorkoutTemplate';

import {
	selectWorkoutById,
	useLazyGetWorkoutsQuery,
} from 'features/workout/store';
import { useEffect } from 'react';

export const Workout = () => {
	const [fetchWorkout] = useLazyGetWorkoutsQuery();
	const { id } = useParams();
	const data = useSelector((state) => selectWorkoutById(state, id));

	useEffect(() => {
		if (!data) {
			console.log('useeffect ran, Workout');
			fetchWorkout();
		}
	}, [data]);

	return (
		<ContentLayout title="Workout Template" link={'../'}>
			<WorkoutTemplate data={data} />
		</ContentLayout>
	);
};
