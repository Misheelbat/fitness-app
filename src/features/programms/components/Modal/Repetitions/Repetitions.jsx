import { useState } from 'react';

import { Button } from 'components/Elements';
import { Form } from './Form/RepsForm';
import { SetsBtn } from './SetsBtn/SetsBtn';
import { createElements, extractArray } from 'features/programms/utility';

import styles from './Repetitions.module.css';

export const Repetitions = ({ sets, repsFormRef }) => {
	const [currentSet, setCurrentSet] = useState(1);

	const prev = () => {
		if (currentSet === 1) return;
		setCurrentSet((set) => set - 1);
	};
	const next = () => {
		if (currentSet >= sets) return;
		setCurrentSet((set) => set + 1);
	};

	const setsArray = createElements(sets);

	const handleSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const a = extractArray(formData);
		console.log(a);
	};

	return (
		<div>
			<div className={styles.setsControl}>
				<div>Set : {currentSet}</div>
				<SetsBtn prev={prev} next={next} />
			</div>
			<form onSubmit={handleSubmit}>
				{setsArray.map((set) => (
					<Form key={set} active={set === currentSet ? 'active' : ''} />
				))}
				<Button ref={repsFormRef} buttonType="max-width">
					Save
				</Button>
			</form>
		</div>
	);
};
