import { useState } from 'react';

import { Button } from 'components/Elements';
import { TableGrid } from './WTable/TableGrid/TableGrid';
import { Modal } from '../Modal/Modal';
import styles from './WorkoutTemplate.module.css';

export const WorkoutTemplate = ({ data = '' }) => {
	const [isOpen, setIsOpen] = useState(false);

	const save = async () => {
		console.log('save');
	};
	return (
		<div className={styles.createForm}>
			<div className={styles.createFormHeader}>
				<div className={styles.createFormTitleContainer}>
					<h4 className={styles.createFormTitle}>Workout :</h4>
					<Button onClick={() => save()}>SAVE</Button>
				</div>
				<Button buttonType="add" onClick={() => setIsOpen(!isOpen)}>
					ADD
				</Button>
			</div>
			{isOpen && <Modal close={setIsOpen} />}
			{data ? <TableGrid data={data} /> : <div>'nothing found'</div>}
		</div>
	);
};
