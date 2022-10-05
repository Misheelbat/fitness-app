import { WorkoutIsland } from '../WorkoutIsland/WorkoutIsland';
import { ExerciseIsland } from '../ExerciseIsland/ExerciseIsland';
import styles from './Dashboard.module.css';

export const Dashboard = () => {
	return (
		<div className={styles.mainDashboard}>
			<WorkoutIsland />
			<ExerciseIsland />
		</div>
	);
};
