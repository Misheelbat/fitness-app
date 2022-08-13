import { useState } from 'react';
import { XCircle } from 'phosphor-react';

import { Sets } from './Sets/Sets';
import { Reps } from './Reps/Reps';
import { SearchExercise } from './Search/SearchExercise';
import styles from './Modal.module.css';

export const Modal = ({ close }) => {
	const [sliderValue, setSliderValue] = useState(1);

	return (
		<div className={styles.modal}>
			<div className={styles.modalContainer}>
				<section className={styles.modalHeader}>
					<h2>Add an Exercise</h2>
					<button onClick={() => close(false)} className={styles.closeBtn}>
						<XCircle size={20} />
					</button>
				</section>

				<section className={styles.search}>
					<p className={styles.modalTitle}>Choose an Exercise</p>
					<SearchExercise />
				</section>

				<section className={styles.sets}>
					<p className={styles.modalTitle}>Number of Sets: {sliderValue}</p>
					<Sets sliderValue={sliderValue} setSliderValue={setSliderValue} />
				</section>

				<section className={styles.reps}>
					<p className={styles.modalTitle}>Number of Repetitions:</p>
					<div className={styles.repsInfo}>
						If you do the same reps for all sets, you can just enter one value
					</div>
					<Reps sets={Number(sliderValue)} />
				</section>
			</div>
		</div>
	);
};
