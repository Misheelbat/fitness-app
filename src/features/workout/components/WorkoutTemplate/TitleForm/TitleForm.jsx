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
	const [active, setActive] = useState(true);
	const [updateTitle] = useUpdateWorkoutTitleMutation();
	const workout = useSelector((state) =>
		selectWorkoutById(state, initialTitle)
	);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleTitleSubmit = (e) => {
		e.preventDefault();
		setTitle(e.target.value);
	};
	const handleTitleChange = async () => {
		setActive(!active);
		if (!active && initialTitle) {
			dispatch(updateWorkout({ id: initialTitle, changes: { id: title } }));
			try {
				await updateTitle({
					id: initialTitle,
					data: { ...workout, id: title },
				}).unwrap();
				navigate(`../${title}`);
			} catch (error) {
				console.log(error);
			}
		}
	};
	return (
		<div className={styles.titleForm}>
			<form onSubmit={handleTitleSubmit}>
				<input
					required
					aria-disabled={active}
					value={title}
					type="text"
					name="workoutTitle"
					id="workoutTitle"
					onChange={(e) => setTitle(e.target.value)}
					disabled={active}
				/>
			</form>
			<button onClick={handleTitleChange}>
				<Pen size={20} weight="bold" />
			</button>
		</div>
	);
};
