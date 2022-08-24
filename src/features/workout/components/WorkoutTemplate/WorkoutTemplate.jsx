import { useState } from 'react';
import { useReactTable, getCoreRowModel } from '@tanstack/react-table';

import { Button } from 'components/Elements';
import { TableGrid } from 'components/Table';
import { columns } from 'features/workout/api';
import { Modal } from '../Modal/Modal';
import styles from './WorkoutTemplate.module.css';

export const WorkoutTemplate = ({ data = [] }) => {
	const [isOpen, setIsOpen] = useState(false);

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<div className={styles.createForm}>
			<div className={styles.createFormHeader}>
				<div className={styles.createFormTitleContainer}>
					<h4 className={styles.createFormTitle}>Workout :</h4>
					<Button onClick={() => setIsOpen(!isOpen)}>SAVE</Button>
				</div>
				<Button buttonType="add" onClick={() => setIsOpen(!isOpen)}>
					ADD
				</Button>
			</div>
			{isOpen && <Modal close={setIsOpen} />}
			<TableGrid table={table} />
		</div>
	);
};
// console.log(table.getSelectedRowModel().flatRows.map((e) => e.original));
