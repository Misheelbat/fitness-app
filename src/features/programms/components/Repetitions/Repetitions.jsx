import { useState, useCallback } from 'react';

import { Button } from 'components/Elements';
import { RepsForm } from './RepsForm/RepsForm';
import { SetsBtn } from './SetsBtn/SetsBtn';
import { createElements } from 'features/programms/utility';

import styles from './Repetitions.module.css';

export const Repetitions = ({ sets }) => {
	const [currentSet, setCurrentSet] = useState(1);

	const prev = () => {
		if (currentSet === 1) return;
		setCurrentSet((set) => set - 1);
	};
	const next = () => {
		if (currentSet === sets) return;
		setCurrentSet((set) => set + 1);
	};
	const setsArray = useCallback(() => createElements(sets), [sets])();

	const handleSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		for (const value of formData.values()) {
			console.log(value);
		}
	};

	return (
		<div>
			<div className={styles.setsControl}>
				<div>Set : {currentSet}</div>
				<SetsBtn prev={prev} next={next} />
			</div>
			<form onSubmit={handleSubmit}>
				{setsArray.map((set) => (
					<RepsForm key={set} active={set === currentSet ? 'active' : ''} />
				))}
				<Button buttonType="max-width">Save</Button>
			</form>
		</div>
	);
};
