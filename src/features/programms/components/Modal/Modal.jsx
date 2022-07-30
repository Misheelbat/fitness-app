import { useState } from 'react';
import { XCircle } from 'phosphor-react';

import { SearchForm, SEARCH_TYPES } from 'components/Elements';
import { useSearchExerciseMutation } from 'features/exercises';
import styles from './Modal.module.css';

export const Modal = ({ close }) => {
	const [sliderVal, setSliderVal] = useState(1);
	const [_, { data }] = useSearchExerciseMutation({ fixedCacheKey: 'search' });

	const handleRange = (e) => {
		setSliderVal(e.target.value);
	};
	console.log(data);
	return (
		<div className={styles.modal}>
			<div className={styles.modalContainer}>
				<div className={styles.modalHeader}>
					<h2>Add an Exercise</h2>
					<button onClick={close} className={styles.closeBtn}>
						<XCircle size={20} />
					</button>
				</div>

				<div className={styles.exerciseSearch}>
					<p>Choose an Exercise</p>
					<SearchForm width={SEARCH_TYPES.max} />
					{data &&
						data.suggestions?.map((ex) => <div key={ex.value}>{ex.value}</div>)}
				</div>

				<div className={styles.sets}>
					<p>Number of Sets: {sliderVal}</p>
					<input
						type="range"
						min="0"
						max="10"
						value={sliderVal}
						onChange={handleRange}
					/>
				</div>

				<div className={styles.reps}>
					<p>Number of Repetitions</p>
				</div>
			</div>
		</div>
	);
};
