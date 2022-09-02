import { useState } from 'react';

import { AddExerciseModal } from '../AddExerciseModal/AddExerciseModal';
import { Button } from 'components/Elements';
import { TableGrid } from './Table';
import { Title } from './Title/Title';
import styles from './WorkoutTemplate.module.css';

export const WorkoutTemplate = ({ data }) => {
	const [openModal, setOpenModal] = useState(false);
	const [workoutTitle, setWorkoutTitle] = useState(data?.id);

	const onModalOpen = () => setOpenModal(!openModal);
	return (
		<div className={styles.createForm}>
			<div className={styles.createFormHeader}>
				<div className={styles.createFormTitleContainer}>
					<div className={styles.createFormTitleHeader}>
						<h4 className={styles.createFormTitle}>Workout :</h4>
						<Title data={data} title={workoutTitle} setTitle={setWorkoutTitle} />
					</div>
				</div>
				<Button type="button" buttonType="add" onClick={onModalOpen}>
					ADD
				</Button>
			</div>
			{openModal && <AddExerciseModal title={workoutTitle} close={setOpenModal} />}
			<TableGrid data={data?.exercises} workout={data?.id} />
		</div>
	);
};
