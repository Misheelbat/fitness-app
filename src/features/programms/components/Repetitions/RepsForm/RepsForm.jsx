import cx from 'classnames';
import Select from 'react-select';
import { repUnits, weightUnits } from 'features/programms';

import styles from './RepsForm.module.css';
import { useState } from 'react';
export const RepsForm = ({ active }) => {
	const [repInput, setRepInput] = useState({ reps: '', unit: repUnits[0] });
	const [weightInput, setWeightInput] = useState({
		weight: '',
		unit: weightUnits[0],
	});

	const handleSubmit = () => {};
	console.log(repInput, weightInput);

	return (
		<form
			onSubmit={handleSubmit}
			className={cx(styles.repsGroup, styles[active])}
		>
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
						styles={customStyles}
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
						styles={customStyles}
						options={weightUnits}
						inputId="weightUnits"
						value={weightInput.unit}
						onChange={(e) => setWeightInput({ ...weightInput, unit: e })}
					/>
				</div>
			</div>
		</form>
	);
};

const customStyles = {
	control: (styles) => ({
		...styles,
		backgroundColor: '#1c1f2e',
		fontSize: '14px',
		border: 'none',
		padding: '2px',
		cursor: 'pointer',
	}),

	singleValue: (styles) => ({
		...styles,
		color: 'white',
		cursor: 'pointer',
	}),

	menu: (styles) => ({
		...styles,
		backgroundColor: '#1c1f2e',
		fontSize: '14px',
		color: '#d9d9d9',
	}),

	option: (styles, { isFocused }) => ({
		...styles,
		backgroundColor: isFocused ? '#2267dc' : null,
		minWidth: 'max-content',
		width: '100%',
		cursor: 'pointer',
	}),
	container: (styles) => ({
		...styles,
		width: '100%',
	}),
};
