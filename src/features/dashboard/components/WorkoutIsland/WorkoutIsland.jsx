import { useState } from 'react';
import { useGetSchedulesQuery } from 'features/schedule';
import { isThisWeek } from 'date-fns';

import Select from 'react-select';
import { Island } from '../Island/Island';

import customStyles from './react-select.styles';
import styles from './WorkoutIsland.module.css';

export const WorkoutIsland = () => {
	const { data: schedules, isSuccess } = useGetSchedulesQuery();

	const [value, setValue] = useState({ label: 'Week', value: 'week' });
	const handleChange = (e) => {
		setValue(e);
	};
	let nOfWorkout = [];
	let nDoneWorkout = [];
	let nMissedWorkout = [];
	let nLeftWorkout = [];

	if (isSuccess) {
		nOfWorkout = Object.values(schedules).filter((event) => {
			return isThisWeek(new Date(event.id), { weekStartsOn: 1 });
		});
		nDoneWorkout = nOfWorkout.filter((e) => e.status === 'complete');
		nMissedWorkout = nOfWorkout.filter((e) => e.status === 'inComplete');
		nLeftWorkout = nOfWorkout.filter((e) => e.status === 'tobeCompleted');
	}
	return (
		<Island>
			<Island.Title>Workouts</Island.Title>
			<Island.Content>
				<div className={styles.contentContainer}>
					<Select
						value={value}
						options={defaultSelectValue}
						onChange={handleChange}
						styles={customStyles}
					/>
					<span>{`: ${nOfWorkout.length} / ${7 - nOfWorkout.length}RD`}</span>
				</div>
			</Island.Content>
			<Island.Footer>
				<span className={styles.workoutDone}>Done: {nDoneWorkout.length}</span>
				<span className={styles.workoutLeft}>Left: {nLeftWorkout.length}</span>
				<span className={styles.workoutMissed}>Missed: {nMissedWorkout.length}</span>
			</Island.Footer>
		</Island>
	);
};
export const defaultSelectValue = [
	{ label: 'Week', value: 'week' },
	{ label: 'Month', value: 'month' },
	{ label: 'Year', value: 'year' },
];
