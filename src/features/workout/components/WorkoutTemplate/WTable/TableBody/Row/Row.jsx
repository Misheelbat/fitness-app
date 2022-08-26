import { useEffect, useState } from 'react';
import { useGetTableDataQuery } from 'features/workout/store';

export const Row = ({ rowInfo }) => {
	const [exercise, setExercise] = useState({});
	const { data, isLoading } = useGetTableDataQuery(rowInfo);

	useEffect(() => {
		if (!isLoading) {
			setExercise(data);
		}
	}, [data, isLoading]);

	return (
		<tr>
			{Object.values(exercise).map((v) => (
				<td key={v + rowInfo.id}>{v}</td>
			))}
		</tr>
	);
};
