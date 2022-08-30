import { useParams } from 'react-router-dom';

import { ContentLayout } from 'components/Layout';
import { WorkoutTemplate } from '../../components/WorkoutTemplate/WorkoutTemplate';

import { useGetWorkoutsQuery } from 'features/workout/store';

export const Workout = () => {
	const { id } = useParams();
	const { data } = useGetWorkoutsQuery();

	return (
		<ContentLayout title="Workout Template" link={'../'}>
			<WorkoutTemplate data={data?.entities[id]} />
		</ContentLayout>
	);
};
