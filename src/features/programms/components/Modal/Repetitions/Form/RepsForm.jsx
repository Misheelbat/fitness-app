import { useState } from 'react';
import cx from 'classnames';
import Select from 'react-select';
import { repUnits, weightUnits } from 'features/programms';

import styles from './RepsForm.module.css';
import { unitStyles } from './select-styles';

export const Form = ({ active }) => {
	const [repInput, setRepInput] = useState({ reps: '', unit: repUnits[0] });
	const [weightInput, setWeightInput] = useState({
		weight: '',
		unit: weightUnits[0],
	});

	// const a = `${repInput.reps} ${repInput.unit.value}`;
	// const b = `${weightInput.reps} ${weightInput.unit.value}`;

	return (
		<div className={cx(styles.repsGroup, styles[active])}>
			<div className={styles.inputGroup}>
				<div className={styles.inputForm}>
					<label htmlFor="reps">Reps</label>
					<input
						placeholder="Repititions"
						type="number"
						id="reps"
						name="reps"
						value={repInput.reps}
						onChange={(e) => setRepInput({ ...repInput, reps: e.target.value })}
					/>
				</div>
				<div className={styles.selectForm}>
					<label htmlFor="repsUnits">Units</label>
					<Select
						options={repUnits}
						name="repsUnits"
						styles={unitStyles}
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
					<label htmlFor="weightUnits">Units</label>
					<Select
						styles={unitStyles}
						options={weightUnits}
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
