import { ContentLayout } from 'components/Layout';
import { Dashboard } from '../../components/Dashboard/Dashboard';

export const DashboardRoute = () => {
	return (
		<ContentLayout title="My Dashboard">
			<Dashboard />
		</ContentLayout>
	);
};
