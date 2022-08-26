import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { ContentLayout } from 'components/Layout';
import { WorkoutTemplate } from '../../components/WorkoutTemplate/WorkoutTemplate';

import { selectWorkoutById } from 'features/workout/store';

export const Workout = () => {
	const { id } = useParams();
	const data = useSelector((state) => selectWorkoutById(state, id));

	let content;
	if (!data) {
		content = <WorkoutTemplate />;
	} else if (data) {
		content = <WorkoutTemplate data={data.workouts} />;
	}

	return <ContentLayout title="Programm">{content}</ContentLayout>;
};
