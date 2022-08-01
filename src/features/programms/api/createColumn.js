import { createColumnHelper } from '@tanstack/react-table';

import { DeleteBtn } from 'components/Elements';

const columnHelper = createColumnHelper();

export const columns = [
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
		header: <DeleteBtn />,
		cell: (e) => <DeleteBtn onClick={() => del(e)} />,
	}),
];

function del(ar) {
	console.log(ar.row.original);
}
