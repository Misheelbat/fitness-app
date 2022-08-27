import { TableHead } from '../TableHead/TableHead';
import { TableBody } from '../TableBody/TableBody';
import styles from './TableGrid.module.css';
import { memo } from 'react';

export let TableGrid = ({ data }) => {
	return (
		<table className={styles.tableGrid}>
			<TableHead />
			<TableBody data={data} />
		</table>
	);
};

TableGrid = memo(TableGrid);
