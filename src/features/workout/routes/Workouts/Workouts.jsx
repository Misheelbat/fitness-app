import { ContentLayout } from 'components/Layout';
import { Dashboard } from '../../components/Dashboard/Dashboard';

export const Workouts = () => {
	return (
		<ContentLayout title="My Workouts">
			<Dashboard />
		</ContentLayout>
	);
};
