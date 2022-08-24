import { useState } from 'react';

import { RepsFormInput } from './RepsFormInput/RepsFormInput';
import { ArrowBtn } from './ArrowBtn/ArrowBtn';
import { createArray } from 'features/workout/utility';

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
				<RepsFormInput key={set} active={set === currentSet ? 'active' : ''} />
			))}
		</div>
	);
};
