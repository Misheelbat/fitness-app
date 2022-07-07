import { ContentLayout } from 'components/Layout';
import { ExerciseTab } from '../../components';
import { ExerciseProvider } from 'features/exercises';

export const Exercises = () => {
	return (
		<ExerciseProvider>
			<ContentLayout title={'Exercises'}>
				<div>
					<ExerciseTab />
				</div>
			</ContentLayout>
		</ExerciseProvider>
	);
};
