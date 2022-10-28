import { ActivityIsland } from '../ActivityIsland/ActivityIsland';
import { WorkoutIsland } from '../WorkoutIsland/WorkoutIsland';

import styles from './Dashboard.module.css';

export const Dashboard = () => {
	return (
		<div className={styles.mainDashboard}>
			<ActivityIsland />
			<WorkoutIsland />
		</div>
	);
};
