import { CaretLeft, CaretRight } from 'phosphor-react';
import { Dropdown } from '../Dropdown/Dropdown';

import styles from './ExerciseList.module.css';

export const ExerciseList = () => {
	return (
		<div className={styles.exerciseList}>
			<Dropdown />
			<div className={styles.info}>
				<div className={styles.arrowsBtns}>
					<button>
						<CaretLeft />
					</button>
					<button>
						<CaretRight />
					</button>
				</div>
				<p>9 of 19 showing</p>
			</div>
			<p>Selected: Muscle - Chest</p>
			<div>
				<div>Barbell</div>
			</div>
		</div>
	);
};
