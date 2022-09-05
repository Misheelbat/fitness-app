import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import { extractRepsData, SETS_DEFAULT_VALUE, useAddExerciseToWorkoutMutation } from 'features/workout';

import { Reps } from './Reps/Reps';
import { Sets } from './Sets/Sets';
import { XCircle } from 'phosphor-react';
import { Button } from 'components/Elements';
import { SearchExercise } from './Search/SearchExercise';

import styles from './AddExerciseModal.module.css';

export const AddExerciseModal = ({ close, title }) => {
	const [selectedExId, setSelectedExId] = useState(null);
	const [sliderValue, setSliderValue] = useState(SETS_DEFAULT_VALUE);
	const [addNewExerciseToWorkout, { isLoading, isSuccess }] = useAddExerciseToWorkoutMutation();

	useEffect(() => {
		if (isSuccess) {
			setSliderValue(SETS_DEFAULT_VALUE);
			toast.success('Added Exercise to Workout');
			close(false);
		}
	}, [isSuccess, close]);

	const canSave = [title, selectedExId].every(Boolean);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!canSave) {
			toast.error('Please select an exercise');
			return;
		}
		const formData = new FormData(e.currentTarget);
		const reps = extractRepsData(formData);
		try {
			await addNewExerciseToWorkout({
				title,
				data: { id: selectedExId, reps },
			}).unwrap();
		} catch (error) {
			toast.error(error);
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
					<SearchExercise selectFn={setSelectedExId} id={selectedExId} />
				</section>

				<form onSubmit={handleSubmit}>
					<section className={styles.sets}>
						<p className={styles.modalTitle}>Number of Sets: {sliderValue}</p>
						<Sets sliderValue={sliderValue} setSliderValue={setSliderValue} />
					</section>

					<section className={styles.reps}>
						<p className={styles.modalTitle}>Number of Repetitions:</p>
						<div className={styles.repsInfo}>If you do the same reps for all sets, you can just enter one value</div>
						<Reps sets={Number(sliderValue)} />
					</section>

					<Button isLoading={isLoading} type="submit" buttonType="max-width" aria-disabled={!canSave}>
						Save
					</Button>
				</form>
			</div>
		</div>
	);
};