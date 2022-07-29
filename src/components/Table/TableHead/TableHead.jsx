import { flexRender } from '@tanstack/react-table';
import styles from './TableHead.module.css';

export const TableHead = ({ headerGroups }) => {
	return (
		<thead className={styles.tableHead}>
			{headerGroups.map((headerGroup) => (
				<tr key={headerGroup.id}>
					{headerGroup.headers.map((header) => (
						<th key={header.id}>
							{header.isPlaceholder
								? null
								: flexRender(
										header.column.columnDef.header,
										header.getContext()
								  )}
						</th>
					))}
				</tr>
			))}
		</thead>
	);
};
