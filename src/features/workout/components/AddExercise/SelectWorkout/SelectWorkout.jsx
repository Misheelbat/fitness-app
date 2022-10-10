import Select from 'react-select';

import { useGetWorkoutsQuery } from 'features/workout/store';

import styles from './SelectWorkoutStyle';
export const SelectWorkout = ({ defaultOption, setDefaultOption }) => {
	const { data: workouts } = useGetWorkoutsQuery();
	return (
		<Select
			value={defaultOption.value ? defaultOption : ''}
			options={workouts?.ids.map((id) => ({ value: id, label: id }))}
			onChange={(e) => setDefaultOption(e)}
			hideSelectedOptions={true}
			noOptionsMessage={() => 'No Workouts Found'}
			styles={styles}
		/>
	);
};
