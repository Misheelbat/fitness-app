import Select from 'react-select';

import { useGetWorkoutsQuery } from 'features/workout/store';

import styles from './SelectWorkoutStyle';
export const SelectWorkout = ({ selectedWorkout, setSelectedWorkout }) => {
	const { data: workouts } = useGetWorkoutsQuery();

	const selectCurrentValue = selectedWorkout
		? { label: selectedWorkout, value: selectedWorkout }
		: null;

	return (
		<Select
			value={selectCurrentValue}
			options={workouts?.ids.map((id) => ({ value: id, label: id }))}
			onChange={(e) => setSelectedWorkout(e.value)}
			hideSelectedOptions={true}
			noOptionsMessage={() => 'No Workouts Found'}
			placeholder={'Select a Workout'}
			styles={styles}
		/>
	);
};
