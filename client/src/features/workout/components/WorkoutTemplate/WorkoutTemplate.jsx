import { useState } from 'react';

import { TableGrid } from './Table';
import { Title } from './Title/Title';
import { Modal } from 'components/Modal/Modal';
import { AddExercise } from '../AddExercise/AddExercise';

import styles from './WorkoutTemplate.module.css';

export const WorkoutTemplate = ({ data }) => {
	const [workoutTitle, setWorkoutTitle] = useState(data?.id);

	return (
		<div className={styles.createForm}>
			<div className={styles.createFormHeader}>
				<div className={styles.createFormTitleContainer}>
					<div className={styles.createFormTitleHeader}>
						<h4 className={styles.createFormTitle}>Workout :</h4>
						<Title
							data={data}
							title={workoutTitle}
							setTitle={setWorkoutTitle}
						/>
					</div>
				</div>
				<Modal>
					<Modal.Title>Add Exercise</Modal.Title>
					<Modal.Content contentLabel="add exercise to workout form">
						<AddExercise title={workoutTitle} />
					</Modal.Content>
				</Modal>
			</div>
			<TableGrid data={data?.exercises} workout={data?.id} />
		</div>
	);
};
