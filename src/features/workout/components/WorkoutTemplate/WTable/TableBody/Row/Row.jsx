import { useEffect, useState } from 'react';
import { useGetTableDataQuery } from 'features/workout/store';

export const Row = ({ rowData }) => {
	const [exercise, setExercise] = useState({});
	const { data, isLoading } = useGetTableDataQuery(rowData);

	useEffect(() => {
		if (!isLoading) {
			setExercise(data);
		}
	}, [data, isLoading]);

	return (
		<tr>
			{Object.values(exercise).map((value) => (
				<td key={value + rowData.id}>{value}</td>
			))}
		</tr>
	);
};
