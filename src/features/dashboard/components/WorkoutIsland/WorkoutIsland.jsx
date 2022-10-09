import { useState } from 'react';
import { useGetSchedulesQuery } from 'features/schedule';
import { isThisWeek } from 'date-fns';

import Select from 'react-select';
import { Island } from '../Island/Island';

import customStyles from './react-select.styles';
import styles from './WorkoutIsland.module.css';

const completedWorkout = (e) => e === 'complete';
const inCompletedWorkout = (e) => e === 'inComplete';
const tobeCompletedWorkout = (e) => e === 'tobeCompleted';

export const WorkoutIsland = () => {
	const { data: schedules, isSuccess } = useGetSchedulesQuery();

	const [value, setValue] = useState({ label: 'Week', value: 'week' });
	const handleChange = (e) => {
		setValue(e);
	};
	let nOfWorkout = [];
	let nCompletedWorkouts = 0;
	let nIncompletedWorkouts = 0;
	let nTobeCompletedWorkouts = 0;

	if (isSuccess) {
		nOfWorkout = Object.values(schedules).filter((event) => {
			if (isThisWeek(new Date(event.id), { weekStartsOn: 1 })) {
				if (completedWorkout(event.status)) nCompletedWorkouts++;
				if (inCompletedWorkout(event.status)) nIncompletedWorkouts++;
				if (tobeCompletedWorkout(event.status)) nTobeCompletedWorkouts++;
				return true;
			} else {
				return false;
			}
		});
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
				<span className={styles.workoutDone}>Done: {nCompletedWorkouts}</span>
				<span className={styles.workoutLeft}>Left: {nTobeCompletedWorkouts}</span>
				<span className={styles.workoutMissed}>Missed: {nIncompletedWorkouts}</span>
			</Island.Footer>
		</Island>
	);
};
export const defaultSelectValue = [
	{ label: 'Week', value: 'week' },
	{ label: 'Month', value: 'month' },
	{ label: 'Year', value: 'year' },
];
