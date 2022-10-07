import { useState } from 'react';
// import { getDaysInMonth } from 'date-fns';

import Select from 'react-select';
import { Island } from '../Island/Island';

import customStyles from './react-select.styles';
import styles from './WorkoutIsland.module.css';

export const WorkoutIsland = () => {
	const [value, setValue] = useState({ label: 'Week', value: 'week' });
	const handleChange = (e) => {
		setValue(e);
	};
	return (
		<Island>
			<Island.Title>Workouts</Island.Title>
			<Island.Content>
				<div className={styles.contentContainer}>
					<Select
						value={value}
						options={defaultValue}
						onChange={handleChange}
						styles={customStyles}
					/>
					<span>: 5/2 RD</span>
				</div>
			</Island.Content>
			<Island.Footer>
				<span className={styles.workoutDone}>Done: 5</span>
				<span className={styles.workoutLeft}>Left: 2</span>
			</Island.Footer>
		</Island>
	);
};
export const defaultValue = [
	{ label: 'Week', value: 'week' },
	{ label: 'Month', value: 'month' },
	{ label: 'Year', value: 'year' },
];
