import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addExerciseToWorkout } from 'features/programms/store';

import { Button } from 'components/Elements';
import { Form } from './Form/RepsForm';
import { SetsBtn } from './SetsBtn/SetsBtn';
import { createElements, extractArray } from 'features/programms/utility';

import styles from './Repetitions.module.css';

export const Repetitions = ({ sets }) => {
	const dispatch = useDispatch();
	const [currentSet, setCurrentSet] = useState(1);

	const setsArray = createElements(sets);

	const handleSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const reps = extractArray(formData);
		console.log(reps);
		dispatch(addExerciseToWorkout(reps));
	};

	return (
		<div>
			<div className={styles.setsControl}>
				<div>Set : {currentSet}</div>
				<SetsBtn page={currentSet} setPage={setCurrentSet} total={sets} />
			</div>
			<form onSubmit={handleSubmit}>
				{setsArray.map((set) => (
					<Form key={set} active={set === currentSet ? 'active' : ''} />
				))}
				<Button buttonType="max-width">Save</Button>
			</form>
		</div>
	);
};
