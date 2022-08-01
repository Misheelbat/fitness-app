import { TableHead } from '../TableHead/TableHead';
import { TableBody } from '../TableBody/TableBody';
import styles from './TableGrid.module.css';
import { memo } from 'react';

export let TableGrid = ({ table }) => {
	return (
		<table className={styles.tableGrid}>
			<TableHead headerGroups={table.getHeaderGroups()} />
			<TableBody rowModel={table.getRowModel()} />
		</table>
	);
};

TableGrid = memo(TableGrid);
