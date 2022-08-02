import Select from 'react-select';

import { repUnits, weightUnits } from 'features/programms';
import styles from './Repetitions.module.css';

export const Repetitions = () => {
	return (
		<div>
			<p>Number of Repetitions:</p>
			<div className={styles.repsGroup}>
				<div className={styles.inputGroup}>
					<div className={styles.inputForm}>
						<label htmlFor="reps">Reps</label>
						<input
							placeholder="Repititions"
							type="number"
							id="reps"
							name="reps"
						/>
					</div>
					<div className={styles.selectForm}>
						<label htmlFor="repsUnits">Units</label>
						<Select
							options={repUnits}
							styles={customStyles}
							inputId="repsUnits"
							defaultValue={repUnits[0]}
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
						/>
					</div>
					<div className={styles.selectForm}>
						<label htmlFor="weightUnits">Units</label>
						<Select
							styles={customStyles}
							options={weightUnits}
							inputId="weightUnits"
							defaultValue={weightUnits[0]}
						/>
					</div>
				</div>
			</div>
		</div>
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
