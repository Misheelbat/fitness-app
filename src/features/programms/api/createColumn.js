import { createColumnHelper } from '@tanstack/react-table';

import { Trash } from 'phosphor-react';
import { Checkbox } from '../components/checkbox/Checkbox';

const columnHelper = createColumnHelper();
export const columns = [
	columnHelper.accessor('checkbox', {
		header: ({ table }) => (
			<Checkbox
				{...{
					checked: table.getIsAllRowsSelected(),
					indeterminate: table.getIsSomeRowsSelected(),
					onChange: table.getToggleAllRowsSelectedHandler(),
				}}
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				{...{
					checked: row.getIsSelected(),
					indeterminate: row.getIsSomeSelected(),
					onChange: row.getToggleSelectedHandler(),
				}}
			/>
		),
	}),
	columnHelper.accessor('name', {
		header: () => 'NAME',
		cell: (info) => info.getValue(),
	}),
	columnHelper.accessor('category', {
		header: () => 'CATEGORY',
		cell: (info) => info.getValue(),
	}),
	columnHelper.accessor('equipments', {
		header: () => 'EQUIPMENTS',
		cell: (info) => info.getValue().map((e) => <span key={e}>{e},</span>),
	}),
	columnHelper.accessor('sets', {
		header: () => 'SETS',
		cell: (info) => info.getValue(),
	}),
	columnHelper.accessor('reps', {
		header: () => 'REPS',
		cell: (info) => info.getValue(),
	}),
	columnHelper.accessor('delete', {
		header: '',
		cell: (e) => (
			<Trash size={15} weight="bold" onClick={() => del(e.row.original)} />
		),
	}),
];

function del(ar) {
	console.log(ar);
}
