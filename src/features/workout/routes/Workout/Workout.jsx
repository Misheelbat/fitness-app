import { useParams } from 'react-router-dom';

import { ContentLayout } from 'components/Layout';
import { PageSpinner } from 'components/Elements';
import { WorkoutTemplate } from '../../components/WorkoutTemplate/WorkoutTemplate';

import { useGetWorkoutsQuery } from 'features/workout/store';

export const Workout = () => {
	const { id } = useParams();
	const { data, isLoading } = useGetWorkoutsQuery();

	let content;
	if (isLoading) {
		content = <PageSpinner variant="secondary" />;
	} else if (!data) {
		content = <WorkoutTemplate redData={'no data'} />;
	} else if (data) {
		content = <WorkoutTemplate redData={data.entities[id]} />;
	}

	return <ContentLayout title="Programm">{content}</ContentLayout>;
};
