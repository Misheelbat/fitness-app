import { useState } from 'react';
import { useGetWorkoutStats } from '../hooks/useGetWorkoutStats';
import { DEFAULT_TIMEFRAMES } from 'features/dashboard/assets';

import Select from 'react-select';
import { Island } from '../Island/Island';

import customStyles from './react-select.styles';
import styles from './WorkoutIsland.module.css';

export const WorkoutIsland = () => {
	const [timeFrame, setTimeFrame] = useState(DEFAULT_TIMEFRAMES.week);
	const {
		restDays,
		workoutNumber,
		nCompletedWorkouts,
		nIncompletedWorkouts,
		nTobeCompletedWorkouts,
	} = useGetWorkoutStats(timeFrame);

	const handleChange = (e) => {
		setTimeFrame(e.value);
	};
	const defaultSelectValue = Object.values(DEFAULT_TIMEFRAMES).map((timeFrame) => ({
		label: timeFrame,
		value: timeFrame,
	}));

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
						styles={customStyles}
					/>
					<span>{`: ${workoutNumber} / ${restDays} RD`}</span>
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
