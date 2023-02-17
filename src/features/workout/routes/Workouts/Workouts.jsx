import { ContentLayout } from 'components/Layout';
import { MyWorkouts } from '../../components/MyWorkouts/MyWorkouts';

export const Workouts = () => {
	return (
		<ContentLayout title="My Workouts">
			<MyWorkouts />
		</ContentLayout>
	);
};
