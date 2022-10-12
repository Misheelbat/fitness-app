import { useState } from 'react';
import { toast } from 'react-toastify';

import { useCreateWorkoutMutation } from 'features/workout/store';

import { Button } from 'components/Elements';
import styles from './CreateWorkout.module.css';

export const CreateWorkout = () => {
	const [workoutTitle, setWorkoutTitle] = useState('');
	const [createWorkout, { isLoading }] = useCreateWorkoutMutation();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!workoutTitle) {
			return toast.error('Please enter a Workout title!');
		}
		try {
			await createWorkout(workoutTitle).unwrap();
			toast.success('New workout created!');
		} catch (error) {
			toast.error(error);
		}
	};
	return (
		<form onSubmit={handleSubmit} className={styles.createWorkoutForm}>
			<label htmlFor="title">Create a new Workout</label>
			<input
				type="text"
				name="title"
				id="title"
				placeholder="Please enter a Workout title"
				value={workoutTitle}
				onChange={(e) => setWorkoutTitle(e.target.value)}
			/>
			<Button
				type="submit"
				buttonType="max-width"
				isLoading={isLoading}
				aria-disabled={!workoutTitle}
			>
				Create
			</Button>
		</form>
	);
};
