import { CATEGORIES_DEFAULT_VALUE } from 'features/workout';

import styles from './TableHead.module.css';

export const TableHead = () => {
	return (
		<thead className={styles.tableHead}>
			<tr>
				{CATEGORIES_DEFAULT_VALUE.map((header) => (
					<th key={header}>{header}</th>
				))}
			</tr>
		</thead>
	);
};
