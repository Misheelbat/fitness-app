import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addExerciseToWorkout } from 'features/workout/store';

import { Button } from 'components/Elements';
import { RepsFormInput } from './RepsFormInput/RepsFormInput';
import { ArrowBtn } from './ArrowBtn/ArrowBtn';
import { createElements, extractArray } from 'features/workout/utility';
import { addWorkout } from 'utils';

import styles from './Reps.module.css';

export const Reps = ({ sets }) => {
	const dispatch = useDispatch();
	const { id, entities } = useSelector((state) => state.modalForm);
	const [currentSet, setCurrentSet] = useState(1);

	const setsArray = createElements(sets);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const reps = extractArray(formData);
		console.log(reps);
		dispatch(addExerciseToWorkout(reps));
		await addWorkout({ id, entities });
	};

	return (
		<div>
			<div className={styles.setsControl}>
				<div>Set : {currentSet}</div>
				<ArrowBtn page={currentSet} setPage={setCurrentSet} total={sets} />
			</div>
			<form onSubmit={handleSubmit}>
				{setsArray.map((set) => (
					<RepsFormInput
						key={set}
						active={set === currentSet ? 'active' : ''}
					/>
				))}
				<Button buttonType="max-width">Save</Button>
			</form>
		</div>
	);
};
