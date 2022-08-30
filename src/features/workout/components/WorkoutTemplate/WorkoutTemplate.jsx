import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { Modal } from '../Modal/Modal';
import { Button } from 'components/Elements';
import { TableGrid } from './WTable/TableGrid/TableGrid';
import { TitleForm } from './TitleForm/TitleForm';
import styles from './WorkoutTemplate.module.css';

export const WorkoutTemplate = ({ data = '' }) => {
	const [openModal, setOpenModal] = useState(false);
	const [workoutTitle, setWorkoutTitle] = useState('');

	useEffect(() => {
		if (data.id) {
			setWorkoutTitle(data.id);
		}
	}, [data.id]);

	const save = async () => {
		console.log('saved');
	};
	return (
		<div className={styles.createForm}>
			<div className={styles.createFormHeader}>
				<div className={styles.createFormTitleContainer}>
					<div className={styles.createFormTitleHeader}>
						<h4 className={styles.createFormTitle}>Workout :</h4>
						<TitleForm
							initialTitle={data?.id}
							title={workoutTitle}
							setTitle={setWorkoutTitle}
						/>
					</div>
					<Button onClick={save}>SAVE</Button>
				</div>
				<Button buttonType="button" onClick={() => setOpenModal(!openModal)}>
					ADD
				</Button>
			</div>
			{openModal && <Modal title={workoutTitle} close={setOpenModal} />}
			<TableGrid data={data?.exercises} />
		</div>
	);
};
