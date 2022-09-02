import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Trash } from 'phosphor-react';

import { Spinner } from 'components/Elements';
import { useGetTableDataQuery, useDeleteExerciseFromWorkoutMutation } from 'features/workout/store';

import styles from './Row.module.css';

export const Row = ({ rowData, workout }) => {
	const [exercise, setExercise] = useState({});
	const { data, isSuccess } = useGetTableDataQuery(rowData);
	const [deleteExercise, { isLoading }] = useDeleteExerciseFromWorkoutMutation();

	useEffect(() => {
		if (data && isSuccess) {
			setExercise(data);
		}
	}, [data, isSuccess]);

	const onDeleteClick = async () => {
		try {
			await deleteExercise({ id: rowData.id, workout }).unwrap();
			toast.success(`${exercise.name} deleted`);
		} catch (error) {
			toast.error('oops something went wrong...');
		}
	};

	return (
		<tr>
			{Object.values(exercise).map((value) => (
				<td key={value + rowData.id}>{value}</td>
			))}
			<td>
				<button className={styles.deleteBtn} onClick={onDeleteClick}>
					{isLoading ? <Spinner size={20} /> : <Trash size={20} />}
				</button>
			</td>
		</tr>
	);
};
