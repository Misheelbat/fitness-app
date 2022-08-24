import { useState } from 'react';
import cx from 'classnames';
import Select from 'react-select';

import {
	REP_UNIT_DEFAULT_VALUE,
	WEIGHT_UNITS_DEFAULT_VALUE,
} from 'features/workout';

import styles from './RepsFormInput.module.css';
import { selectorStyles } from './select-styles';

export const RepsFormInput = ({ active }) => {
	const [repInput, setRepInput] = useState({
		reps: '',
		unit: REP_UNIT_DEFAULT_VALUE[0],
	});
	const [weightInput, setWeightInput] = useState({
		weight: '',
		unit: WEIGHT_UNITS_DEFAULT_VALUE[0],
	});

	return (
		<div className={cx(styles.repsGroup, styles[active])}>
			<div className={styles.inputGroup}>
				<div className={styles.inputForm}>
					<label htmlFor="reps">Reps</label>
					<input
						required
						placeholder="Repititions"
						type="number"
						id="reps"
						name="reps"
						value={repInput.reps}
						onChange={(e) => setRepInput({ ...repInput, reps: e.target.value })}
					/>
				</div>
				<div className={styles.selectForm}>
					<label htmlFor="repsUnit">Units</label>
					<Select
						options={REP_UNIT_DEFAULT_VALUE}
						name="repsUnits"
						styles={selectorStyles}
						inputId="repsUnits"
						value={repInput.unit}
						onChange={(e) => setRepInput({ ...repInput, unit: e })}
					/>
				</div>
			</div>

			<div className={styles.inputGroup}>
				<div className={styles.inputForm}>
					<label htmlFor="weight">Weight</label>
					<input
						required
						placeholder="Weight"
						type="number"
						id="weight"
						name="weight"
						value={weightInput.weight}
						onChange={(e) =>
							setWeightInput({ ...weightInput, weight: e.target.value })
						}
					/>
				</div>
				<div className={styles.selectForm}>
					<label htmlFor="weightsUnit">Units</label>
					<Select
						styles={selectorStyles}
						options={WEIGHT_UNITS_DEFAULT_VALUE}
						inputId="weightUnits"
						name="weightUnits"
						value={weightInput.unit}
						onChange={(e) => setWeightInput({ ...weightInput, unit: e })}
					/>
				</div>
			</div>
		</div>
	);
};
