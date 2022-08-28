import { ContentLayout } from 'components/Layout';
import { WorkoutTemplate } from '../../components/WorkoutTemplate/WorkoutTemplate';

export const CreateTemplate = () => {
	// pass empty array
	return (
		<ContentLayout title="Create Template" link={'../'}>
			<WorkoutTemplate />
		</ContentLayout>
	);
};