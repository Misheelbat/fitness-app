import { Island } from '../Island/Island';

import styles from './WorkoutIsland.module.css';

export const WorkoutIsland = () => {
	return (
		<Island>
			<Island.Title>Workouts</Island.Title>
			<Island.Content>Week: 5/2 RD</Island.Content>
			<Island.Footer>
				<span className={styles.workoutDone}>Done: 5</span>
				<span className={styles.workoutLeft}>Left: 2</span>
			</Island.Footer>
		</Island>
	);
};
