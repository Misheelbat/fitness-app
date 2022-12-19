import { ActivityIsland } from '../ActivityIsland/ActivityIsland';
import { WorkoutIsland } from '../WorkoutIsland/WorkoutIsland';
import { TodaysWork } from '../TodaysWork/TodaysWork';

import styles from './Dashboard.module.css';

export const Dashboard = () => {
	return (
		<div className={styles.mainDashboard}>
			<div className={styles.dashboardHeader}>
				<ActivityIsland />
				<WorkoutIsland />
			</div>
			<TodaysWork />
		</div>
	);
};
