import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Modal } from '../Modal/Modal';
import { Button } from 'components/Elements';
import { TableGrid } from './WTable/TableGrid/TableGrid';
import { TitleForm } from './TitleForm/TitleForm';
import styles from './WorkoutTemplate.module.css';

export const WorkoutTemplate = ({ data = '' }) => {
	const dispatch = useDispatch();
	const [openModal, setOpenModal] = useState(false);
	const [workoutTitle, setWorkoutTitle] = useState('Core Blast');

	useEffect(() => {
		if (data.id) {
			setWorkoutTitle(data.id);
		}
	}, [data.id]);

	const save = async () => {
		console.log('save');
	};
	return (
		<div className={styles.createForm}>
			<div className={styles.createFormHeader}>
				<div className={styles.createFormTitleContainer}>
					<div className={styles.createFormTitleHeader}>
						<h4 className={styles.createFormTitle}>Workout :</h4>
						<TitleForm title={workoutTitle} setTitle={setWorkoutTitle} />
					</div>
					<Button onClick={() => save()}>SAVE</Button>
				</div>
				<Button buttonType="add" onClick={() => setOpenModal(!openModal)}>
					ADD
				</Button>
			</div>
			{openModal && <Modal title={workoutTitle} close={setOpenModal} />}
			{data ? <TableGrid data={data?.exercises} /> : <div>'nothing found'</div>}
		</div>
	);
};
