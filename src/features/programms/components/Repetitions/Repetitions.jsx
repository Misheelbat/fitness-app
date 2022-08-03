import { RepsForm } from './RepsForm/RepsForm';
import { SetsBtn } from './SetsBtn/SetsBtn';
import styles from './Repetitions.module.css';
import { useState } from 'react';

export const Repetitions = ({ sets }) => {
	const [currentSet, setCurrentSet] = useState(1);

	const prev = () => {
		if (currentSet === 1) return;
		setCurrentSet((set) => set - 1);
	};
	const next = () => {
		if (currentSet >= sets) return;
		setCurrentSet((set) => set + 1);
	};
	const setsArray = createElements(sets, RepsForm);
	return (
		<div>
			<p>Number of Repetitions:</p>
			<div className={styles.setsControl}>
				<p>Set : {currentSet}</p>
				<SetsBtn prev={prev} next={next} />
			</div>
			{setsArray.map((set) => (
				<RepsForm key={set} active={set === currentSet ? 'active' : ''} />
			))}
		</div>
	);
};

function createElements(n, element) {
	const elements = [];
	for (let i = 1; i <= n; i++) {
		elements.push(i);
	}
	return elements;
}
