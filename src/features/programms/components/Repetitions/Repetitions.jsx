import { RepsForm } from './RepsForm/RepsForm';
import { SetsBtn } from './SetsBtn/SetsBtn';
import styles from './Repetitions.module.css';
import { useState } from 'react';

export const Repetitions = ({ sets = 3 }) => {
	const [currentSet, setCurrentSet] = useState(1);
	const prev = () => {
		if (currentSet <= 1) return;
		setCurrentSet((set) => set - 1);
	};
	const next = () => {
		if (currentSet >= sets) return;
		setCurrentSet((set) => set + 1);
	};
	return (
		<div>
			<p>Number of Repetitions:</p>
			<div className={styles.setsControl}>
				<p>Set : {currentSet}</p>
				<SetsBtn prev={prev} next={next} />
			</div>
			{[...Array(sets)].map((set, i) => (
				<RepsForm key={i} active={i + 1 === currentSet ? 'active' : ''} />
			))}
		</div>
	);
};
