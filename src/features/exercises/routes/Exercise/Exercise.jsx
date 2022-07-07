import { useParams } from 'react-router-dom';

import { ContentLayout } from 'components/Layout';

export const Exercise = () => {
	const { exerciseId } = useParams();
	return (
		<ContentLayout>
			<div>Exercise {exerciseId}</div>
		</ContentLayout>
	);
};
