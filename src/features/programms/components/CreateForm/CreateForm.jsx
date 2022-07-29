import { useState } from 'react';
import { useReactTable, getCoreRowModel } from '@tanstack/react-table';

import { Button } from 'components/Elements';
import { TableGrid } from 'components/Table';
import { columns } from 'features/programms/api';
import styles from './CreateForm.module.css';

const Person = [
	{
		name: 'Bent Over Barbell Row',
		category: 'Back',
		equipments: ['Barbell'],
		sets: 4,
		reps: 10,
	},
	{
		name: 'Bench Press',
		category: 'Chest',
		equipments: ['Bench', 'Barbell'],
		sets: 4,
		reps: 10,
	},
];

export const CreateForm = () => {
	const [rowSelection, setRowSelection] = useState({});

	const table = useReactTable({
		data: Person,
		columns,
		state: {
			rowSelection,
		},
		onRowSelectionChange: setRowSelection,
		getCoreRowModel: getCoreRowModel(),
	});

	console.log(rowSelection);
	return (
		<div className={styles.createForm}>
			<div className={styles.createFormHeader}>
				<h4>Workouts :</h4>
				<Button buttonType="add">ADD</Button>
			</div>
			<TableGrid table={table} />
		</div>
	);
};
