import { useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

import { Reps } from './Reps/Reps';
import { Sets } from './Sets/Sets';
import { XCircle } from 'phosphor-react';
import { Button } from 'components/Elements';
import { SearchExercise } from './Search/SearchExercise';

import {
	extractRepsData,
	addExerciseToWorkout,
	SETS_DEFAULT_VALUE,
} from 'features/workout';
import styles from './Modal.module.css';

export const Modal = ({ close, title }) => {
	const dispatch = useDispatch();

	const [sliderValue, setSliderValue] = useState(SETS_DEFAULT_VALUE);

	const handleSubmit = (e) => {
		e.preventDefault();
		try {
			const formData = new FormData(e.currentTarget);
			const reps = extractRepsData(formData);
			dispatch(addExerciseToWorkout({ title, reps }));
			setSliderValue(SETS_DEFAULT_VALUE);
			toast.success('Added Exercise to Workout');
			// close(false);
		} catch (error) {
			console.log(error);
			toast.error(error.message);
		}
	};

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

				<form onSubmit={handleSubmit}>
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

					<Button type="submit" buttonType="max-width">
						Save
					</Button>
				</form>
			</div>
		</div>
	);
};
