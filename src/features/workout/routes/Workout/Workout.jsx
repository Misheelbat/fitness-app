import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { ContentLayout } from 'components/Layout';
import { WorkoutTemplate } from '../../components/WorkoutTemplate/WorkoutTemplate';

import { selectWorkoutById } from 'features/workout/store';

export const Workout = () => {
	const { id } = useParams();
	const data = useSelector((state) => selectWorkoutById(state, id));

	return (
		<ContentLayout title="Programm">
			<WorkoutTemplate data={data} />
		</ContentLayout>
	);
};
