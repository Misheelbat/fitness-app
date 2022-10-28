import { useState } from 'react';

import { createArray } from 'features/workout/';

import { RepsFormInput } from './RepsFormInput/RepsFormInput';
import { ArrowBtn } from './ArrowBtn/ArrowBtn';

import styles from './Reps.module.css';

export const Reps = ({ sets }) => {
	const [currentSet, setCurrentSet] = useState(1);
	const setsArray = createArray(sets);

	return (
		<div>
			<div className={styles.setsControl}>
				<div>Set : {currentSet}</div>
				<ArrowBtn page={currentSet} setPage={setCurrentSet} total={sets} />
			</div>
			{setsArray.map((set) => (
				<RepsFormInput
					key={set}
					isActive={set === currentSet ? 'active' : null}
				/>
			))}
		</div>
	);
};
