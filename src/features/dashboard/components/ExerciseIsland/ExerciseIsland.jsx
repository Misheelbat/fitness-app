import { Island } from '../Island/Island';
import styles from './ExerciseIsland.module.css';

export const ExerciseIsland = () => {
	return (
		<Island>
			<Island.Title>Exercises</Island.Title>
			<Island.Content>Week: 18</Island.Content>
			<Island.Footer>
				<span className={styles.exercisesDone}>Done: 10</span>
				<span className={styles.exercisesLeft}>Left: 8</span>
			</Island.Footer>
		</Island>
	);
};
