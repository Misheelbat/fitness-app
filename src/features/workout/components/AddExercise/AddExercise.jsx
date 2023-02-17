import { useState } from 'react';
import { toast } from 'react-toastify';

import {
	extractRepsData,
	useAddExerciseToWorkoutMutation,
} from 'features/workout';

import { Reps } from './Reps/Reps';
import { Sets } from './Sets/Sets';
import { Button } from 'components/Elements';
import { SearchExercise } from './Search/SearchExercise';
import { SelectWorkout } from './SelectWorkout/SelectWorkout';

import styles from './AddExercise.module.css';

export const AddExercise = ({ title = null, ExId }) => {
	const [selectedExId, setSelectedExId] = useState(ExId);
	const [sliderValue, setSliderValue] = useState(1);

	const [selectedWorkout, setSelectedWorkout] = useState(title);

	const [addNewExerciseToWorkout, { isLoading }] =
		useAddExerciseToWorkoutMutation();

	const canSave = selectedWorkout && selectedExId;

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
				title: selectedWorkout,
				data: { id: selectedExId, reps },
			}).unwrap();
			toast.success('Added Exercise to Workout', { toastId: selectedExId });
		} catch (error) {
			toast.error(error);
		}
	};

	return (
		<div>
			<section className={styles.modalHeader}>
				<h2>Add an Exercise</h2>
			</section>

			<section className={styles.selectWorkout}>
				<p className={styles.modalTitle}>Choose a Workout</p>
				<SelectWorkout
					selectedWorkout={selectedWorkout}
					setSelectedWorkout={setSelectedWorkout}
				/>
			</section>

			<section className={styles.search}>
				<p className={styles.modalTitle}>Choose an Exercise</p>
				<SearchExercise
					selectExerciseFn={setSelectedExId}
					exerciseId={selectedExId}
				/>
			</section>

			<form onSubmit={handleSubmit}>
				<section className={styles.sets}>
					<p className={styles.modalTitle}>Number of Sets: {sliderValue}</p>
					<Sets sliderValue={sliderValue} setSliderValue={setSliderValue} />
				</section>

				<section className={styles.reps}>
					<p className={styles.modalTitle}>Number of Repetitions:</p>
					<Reps sets={Number(sliderValue)} />
				</section>

				<Button
					isLoading={isLoading}
					type="submit"
					buttonType="max-width"
					aria-disabled={!canSave}
				>
					Save
				</Button>
			</form>
		</div>
	);
};
