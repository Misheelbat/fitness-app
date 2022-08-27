import { useState } from 'react';
import styles from './TitleForm.module.css';
export const TitleForm = ({ title, setTitle }) => {
	const [active, setActive] = useState(true);
	return (
		<div className={styles.titleForm}>
			<form>
				<input
					aria-disabled={active}
					value={title}
					type="text"
					name="workoutTitle"
					id="workoutTitle"
					onChange={(e) => setTitle(e.target.value)}
					disabled={active}
				/>
			</form>
			<button onClick={() => setActive(!active)}>edit</button>
		</div>
	);
};
