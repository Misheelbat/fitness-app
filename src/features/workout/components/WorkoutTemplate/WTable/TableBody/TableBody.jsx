import { Row } from './Row/Row';

import styles from './TableBody.module.css';
export const TableBody = ({ data, workout }) => {
	return (
		<tbody className={styles.tableBody}>
			{data.ids.map((exerciseId) => (
				<Row key={exerciseId} rowData={data.entities[exerciseId]} workout={workout} />
			))}
		</tbody>
	);
};
