import { useParams } from 'react-router-dom';

import { ContentLayout } from 'components/Layout';
import { ExercisePreview } from 'features/exercises/components';

export const Exercise = () => {
	const { exerciseId } = useParams();
	return (
		<ContentLayout title={'Exercise'} link={'../'}>
			<ExercisePreview id={exerciseId} />
		</ContentLayout>
	);
};
