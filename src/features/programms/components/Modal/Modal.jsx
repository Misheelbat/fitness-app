import { useState } from 'react';
import { XCircle } from 'phosphor-react';

import { Slider } from './Slider/Slider';
import { Repetitions } from './Repetitions/Repetitions';
import { SelectExercise } from './selectExercise/SelectExercise';
import styles from './Modal.module.css';

export const Modal = ({ close }) => {
	const [sliderValue, setSliderValue] = useState(1);

	return (
		<div className={styles.modal}>
			<div className={styles.modalContainer}>
				<div className={styles.modalHeader}>
					<h2>Add an Exercise</h2>
					<button onClick={() => close(false)} className={styles.closeBtn}>
						<XCircle size={20} />
					</button>
				</div>

				<div className={styles.search}>
					<p className={styles.modalTitle}>Choose an Exercise</p>
					<SelectExercise />
				</div>

				<div className={styles.sets}>
					<p className={styles.modalTitle}>Number of Sets: {sliderValue}</p>
					<Slider sliderValue={sliderValue} setSliderValue={setSliderValue} />
				</div>

				<div className={styles.reps}>
					<p className={styles.modalTitle}>Number of Repetitions:</p>
					<div className={styles.repsInfo}>
						If you do the same reps for all sets, you can just enter one value
					</div>
					<Repetitions sets={Number(sliderValue)} />
				</div>
			</div>
		</div>
	);
};
