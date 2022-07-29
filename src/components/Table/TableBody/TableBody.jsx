import { flexRender } from '@tanstack/react-table';

import styles from './TableBody.module.css';
export const TableBody = ({ rowModel }) => {
	return (
		<tbody className={styles.tableBody}>
			{rowModel.rows.map((row) => (
				<tr key={row.id}>
					{row.getVisibleCells().map((cell) => (
						<td key={cell.id}>
							{flexRender(cell.column.columnDef.cell, cell.getContext())}
						</td>
					))}
				</tr>
			))}
		</tbody>
	);
};
