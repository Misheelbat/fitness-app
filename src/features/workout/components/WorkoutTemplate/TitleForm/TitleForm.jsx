import { useState } from 'react';

import { Pen } from 'phosphor-react';

import styles from './TitleForm.module.css';
export const TitleForm = ({ title, setTitle }) => {
	const [active, setActive] = useState(true);

	const handleTitle = (e) => {
		setTitle(e.target.value);
	};

	const handleTitleSubmit = (e) => {
		e.preventDefault();
		console.log('TitleForm formsubmit');
	};

	return (
		<div className={styles.titleForm}>
			<form onSubmit={handleTitleSubmit}>
				<input
					aria-disabled={active}
					value={title}
					type="text"
					name="workoutTitle"
					id="workoutTitle"
					onChange={handleTitle}
					disabled={active}
				/>
			</form>
			<button onClick={() => setActive(!active)}>
				<Pen size={20} weight="bold" />
			</button>
		</div>
	);
};
