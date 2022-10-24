import { DEFAULT_TABLE_HEADERS } from 'features/workout';

import styles from './TableHead.module.css';

export const TableHead = () => {
	return (
		<thead className={styles.tableHead}>
			<tr>
				{DEFAULT_TABLE_HEADERS.map((header) => (
					<th aria-label={header} key={header}>
						{header}
					</th>
				))}
			</tr>
		</thead>
	);
};
