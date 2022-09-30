import { useRef } from 'react';
import { toast } from 'react-toastify';

import { useCreateWorkoutMutation } from 'features/workout/store';

import { Button } from 'components/Elements';
import styles from './CreateWorkout.module.css';

export const CreateWorkout = () => {
	const titleRef = useRef();
	const [createWorkout, { isLoading }] = useCreateWorkoutMutation();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!titleRef.current.value) {
			return toast.error('Please enter a Workout title!');
		}
		try {
			await createWorkout(titleRef.current.value).unwrap();
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
				ref={titleRef}
			/>
			<Button type="submit" buttonType="max-width" isLoading={isLoading}>
				Create
			</Button>
		</form>
	);
};
