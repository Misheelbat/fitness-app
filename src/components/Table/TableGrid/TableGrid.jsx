import { TableHead } from '../TableHead/TableHead';
import { TableBody } from '../TableBody/TableBody';
import styles from './TableGrid.module.css';

export const TableGrid = ({ table }) => {
	return (
		<table className={styles.tableGrid}>
			<TableHead headerGroups={table.getHeaderGroups()} />
			<TableBody rowModel={table.getRowModel()} />
		</table>
	);
};
