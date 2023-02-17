import { useGetTodaysStats } from 'features/dashboard/hooks';
import { Island } from '../Island/Island';

import styles from './ActivityIsland.module.css';

export const ActivityIsland = () => {
	const { todaysActivity, nextWorkoutDate } = useGetTodaysStats();

	return (
		<Island>
			<Island.Title>Todays Activity</Island.Title>
			<Island.Content>{todaysActivity}</Island.Content>
			<Island.Footer>
				<span className={styles.nextWorkout}>Next Workout:</span>
				<span>{nextWorkoutDate}</span>
			</Island.Footer>
		</Island>
	);
};
