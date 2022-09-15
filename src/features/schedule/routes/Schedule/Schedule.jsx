import { ContentLayout } from 'components/Layout';
import { ScheduleForm } from 'features/schedule/components/ScheduleForm/ScheduleForm';
export const Schedule = () => {
	return (
		<ContentLayout title="My Schedules">
			<ScheduleForm />
		</ContentLayout>
	);
};
