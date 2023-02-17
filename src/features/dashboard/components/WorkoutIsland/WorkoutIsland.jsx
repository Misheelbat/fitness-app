import { useState } from 'react';
import Select from 'react-select';

import { Island } from '../Island/Island';
import { DEFAULT_TIMEFRAMES } from 'features/dashboard';
import { useGetWorkoutStats } from 'features/dashboard/hooks';

import selectStyles from './react-select.styles';
import styles from './WorkoutIsland.module.css';

export const WorkoutIsland = () => {
	const [timeFrame, setTimeFrame] = useState(DEFAULT_TIMEFRAMES.week);
	const {
		restDays,
		workoutNumber,
		complete: nCompletedWorkouts,
		inComplete: nIncompletedWorkouts,
		tobeCompleted: nTobeCompletedWorkouts,
	} = useGetWorkoutStats(timeFrame);

	const handleChange = (e) => {
		setTimeFrame(e.value);
	};
	const defaultSelectValue = Object.values(DEFAULT_TIMEFRAMES).map(
		(timeFrame) => ({
			label: timeFrame,
			value: timeFrame,
		})
	);

	return (
		<Island>
			<Island.Title>Workouts</Island.Title>
			<Island.Content>
				<div className={styles.contentContainer}>
					<Select
						value={{
							label: timeFrame,
							value: timeFrame,
						}}
						options={defaultSelectValue}
						onChange={handleChange}
						styles={selectStyles}
					/>
					<span>{`: ${workoutNumber} / ${restDays} RD`}</span>
				</div>
			</Island.Content>
			<Island.Footer>
				<span className={styles.workoutDone}>Done: {nCompletedWorkouts}</span>
				<span className={styles.workoutLeft}>
					Left: {nTobeCompletedWorkouts}
				</span>
				<span className={styles.workoutMissed}>
					Missed: {nIncompletedWorkouts}
				</span>
			</Island.Footer>
		</Island>
	);
};
