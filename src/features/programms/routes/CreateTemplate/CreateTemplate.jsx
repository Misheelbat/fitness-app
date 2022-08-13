import { ContentLayout } from 'components/Layout';
import { WorkoutTemplate } from '../../components/WorkoutTemplate/WorkoutTemplate';

const Person = [
	{
		name: 'Bent Over Barbell Row',
		category: 'Back',
		equipments: ['Barbell'],
		sets: 4,
		reps: 10,
	},
	{
		name: 'Bench Press',
		category: 'Chest',
		equipments: ['Bench', 'Barbell'],
		sets: 4,
		reps: 10,
	},
];

export const CreateTemplate = () => {
	return (
		<ContentLayout title="Create Template" link={'../'}>
			<WorkoutTemplate data={Person} />
		</ContentLayout>
	);
};
