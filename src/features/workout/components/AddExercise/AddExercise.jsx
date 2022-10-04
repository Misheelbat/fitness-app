import { useState } from 'react';
import { toast } from 'react-toastify';

import {
	extractRepsData,
	SETS_DEFAULT_VALUE,
	useAddExerciseToWorkoutMutation,
} from 'features/workout';

import { Reps } from './Reps/Reps';
import { Sets } from './Sets/Sets';
import { Button } from 'components/Elements';
import { SearchExercise } from './Search/SearchExercise';

import styles from './AddExercise.module.css';

export const AddExercise = ({ title }) => {
	const [selectedExId, setSelectedExId] = useState(null);
	const [sliderValue, setSliderValue] = useState(SETS_DEFAULT_VALUE);
	const [addNewExerciseToWorkout, { isLoading }] = useAddExerciseToWorkoutMutation();

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
			toast.success('Added Exercise to Workout');
		} catch (error) {
			toast.error(error);
		}
	};

	return (
		<div>
			<section className={styles.modalHeader}>
				<h2>Add an Exercise</h2>
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
					<div className={styles.repsInfo}>
						If you do the same reps for all sets, you can just enter one value
					</div>
					<Reps sets={Number(sliderValue)} />
				</section>

				<Button isLoading={isLoading} type="submit" buttonType="max-width" aria-disabled={!canSave}>
					Save
				</Button>
			</form>
		</div>
	);
};
