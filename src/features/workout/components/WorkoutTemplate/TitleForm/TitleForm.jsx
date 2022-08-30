import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
	useUpdateWorkoutTitleMutation,
	selectWorkoutById,
	updateWorkout,
} from 'features/workout/store';
import { Pen } from 'phosphor-react';

import styles from './TitleForm.module.css';
export const TitleForm = ({ initialTitle, title, setTitle }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [isDisabled, setIsDisabled] = useState(true);

	const [updateTitle] = useUpdateWorkoutTitleMutation();
	const workout = useSelector((state) =>
		selectWorkoutById(state, initialTitle)
	);

	const handleTitleSubmit = async (e) => {
		e.preventDefault();
		if (initialTitle === title) return;
		if (isDisabled) return;

		dispatch(updateWorkout({ id: initialTitle, changes: { id: title } }));
		try {
			await updateTitle({
				id: initialTitle,
				data: { ...workout, id: title },
			}).unwrap();
			setIsDisabled(true);
			navigate(`../${title}`);
		} catch (error) {
			console.log(error);
		}
	};

	const handleTitleChange = async () => {
		setIsDisabled(!isDisabled);
	};
	return (
		<div className={styles.titleForm}>
			<form onSubmit={handleTitleSubmit}>
				<input
					required
					aria-disabled={isDisabled}
					value={title}
					type="text"
					name="workoutTitle"
					id="workoutTitle"
					onChange={(e) => setTitle(e.target.value)}
					disabled={isDisabled}
				/>
			</form>
			<button onClick={handleTitleChange}>
				<Pen size={20} weight="bold" />
			</button>
		</div>
	);
};
