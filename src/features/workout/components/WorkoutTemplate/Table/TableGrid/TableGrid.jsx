import { TableHead } from '../TableHead/TableHead';
import { TableBody } from '../TableBody/TableBody';
import styles from './TableGrid.module.css';
import { memo } from 'react';

export let TableGrid = ({ data, workout }) => {
	return (
		<table className={styles.tableGrid}>
			<TableHead />
			{data && <TableBody data={data} workout={workout} />}
		</table>
	);
};

TableGrid = memo(TableGrid);
