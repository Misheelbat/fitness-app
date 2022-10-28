import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Trash } from 'phosphor-react';
import { Spinner } from 'components/Elements';

import {
	useGetTableDataQuery,
	useDeleteExerciseFromWorkoutMutation,
} from 'features/workout/store';

import styles from './Row.module.css';
import { DEFAULT_TABLE_HEADERS } from 'features/workout';

export const Row = ({ rowData, workout }) => {
	const {
		data,
		isLoading: isTableDataLoading,
		isSuccess,
	} = useGetTableDataQuery(rowData);

	const [deleteExercise, { isLoading: isDeleteLoading }] =
		useDeleteExerciseFromWorkoutMutation();

	const onDeleteClick = async () => {
		try {
			await deleteExercise({ id: rowData.id, workout }).unwrap();
			toast.success(`${data.name} deleted`, { toastId: rowData.id });
		} catch (error) {
			toast.error('oops something went wrong...');
		}
	};
	return (
		<tr>
			{isTableDataLoading && (
				<td colSpan={6} className={styles.loadingTableData}>
					<Spinner size={20} />
				</td>
			)}

			{!isTableDataLoading && isSuccess && (
				<>
					{Object.values(data).map((value, i) => (
						<td aria-labelledby={DEFAULT_TABLE_HEADERS[i]} key={value}>
							<Link to={`../../exercises/${rowData.id}`}>{value}</Link>
						</td>
					))}
					<td aria-labelledby="Edit">
						<button className={styles.deleteBtn} onClick={onDeleteClick}>
							{isDeleteLoading ? <Spinner size={20} /> : <Trash size={20} />}
						</button>
					</td>
				</>
			)}
		</tr>
	);
};
