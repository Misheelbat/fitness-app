import styles from './TableHead.module.css';

export const TableHead = () => {
	return (
		<thead className={styles.tableHead}>
			<tr>
				{categories.map((header) => (
					<th key={header}>{header}</th>
				))}
			</tr>
		</thead>
	);
};
const categories = ['name', 'category', 'equipment', 'sets', 'reps'];
