import { useState } from 'react';
import { XCircle } from 'phosphor-react';
import { toast } from 'react-toastify';

import { useCreateWorkoutMutation } from 'features/workout/store';

import { Button } from 'components/Elements';
import styles from './CreateFormModal.module.css';

export const CreateFormModal = ({ close }) => {
	const [title, setTitle] = useState('');
	const [createWorkout, { isLoading }] = useCreateWorkoutMutation();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			if (!title) {
				toast.error('Please enter a Workout title!');
				return;
			}
			await createWorkout(title).unwrap();
			toast.success('New workout created!');
			close(false);
		} catch (error) {
			toast.error(error);
		}
	};
	return (
		<div className={styles.createFormContainer}>
			<div className={styles.createFormModal}>
				<button onClick={() => close(false)} className={styles.closeBtn}>
					<XCircle size={20} />
				</button>
				<form onSubmit={handleSubmit}>
					<label htmlFor="title">Please Enter a Title</label>
					<input
						type="text"
						name="title"
						id="title"
						placeholder="Workout title"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
					<Button type="submit" buttonType="max-width" isLoading={isLoading}>
						Create
					</Button>
				</form>
			</div>
		</div>
	);
};
