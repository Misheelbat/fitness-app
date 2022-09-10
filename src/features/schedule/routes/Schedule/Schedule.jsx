import { ContentLayout } from 'components/Layout';
import { Calendar } from '../../components/Calendar/Calendar';

export const Schedule = () => {
	return (
		<ContentLayout title="My Schedules">
			<Calendar />
		</ContentLayout>
	);
};
