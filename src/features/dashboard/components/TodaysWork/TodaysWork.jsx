import { useGetTodaysStats } from 'features/dashboard/hooks';
import { useGetWorkoutsQuery } from 'features/workout';

import { TableGrid } from 'features/workout/components/WorkoutTemplate/Table';
import { Spinner } from 'components/Elements';

import styles from './TodaysWork.module.css';

export const TodaysWork = () => {
	const { todaysActivity } = useGetTodaysStats();
	const { data: workouts, isLoading } = useGetWorkoutsQuery();
	const data = workouts?.entities[todaysActivity];

	let content;
	if (isLoading) {
		content = (
			<div className={styles.loader}>
				<Spinner />
			</div>
		);
	} else if (data) {
		content = <TableGrid data={data?.exercises} workout={data?.id} />;
	} else content = <div className={styles.nothingFound}>No Workout Today</div>;
	return (
		<div className={styles.todaysWork}>
			<p>Todays Workout :</p>
			{content}
		</div>
	);
};
