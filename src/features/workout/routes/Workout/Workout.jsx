import { useParams } from 'react-router-dom';

import { ContentLayout } from 'components/Layout';
import { WorkoutTemplate } from '../../components/WorkoutTemplate/WorkoutTemplate';
import { PageSpinner } from 'components/Elements';
import { useGetWorkoutsQuery } from 'features/workout/store';

const loadingStyle = { height: '100%', width: '100%' };
export const Workout = () => {
	const { id } = useParams();
	const { data, isSuccess, isLoading, isError, error } = useGetWorkoutsQuery();

	let content;
	if (isLoading) {
		content = <PageSpinner styles={loadingStyle} />;
	}

	if (isError) {
		content = <p>{error}</p>;
	}

	if (isSuccess) {
		content = data.entities[id] ? (
			<WorkoutTemplate data={data.entities[id]} />
		) : (
			<div>No data...</div>
		);
	}

	return (
		<ContentLayout title="Workout Template" link={'../'}>
			{content}
		</ContentLayout>
	);
};
