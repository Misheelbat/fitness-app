import { Island } from '../Island/Island';

import styles from './ActivityIsland.module.css';

export const ActivityIsland = () => {
	return (
		<Island>
			<Island.Title>Todays Activity</Island.Title>
			<Island.Content>Core Blast</Island.Content>
			<Island.Footer>
				<span className={styles.nextWorkout}>Next Workout:</span>
				<span>Thu, 22 Oct 2022</span>
			</Island.Footer>
		</Island>
	);
};
