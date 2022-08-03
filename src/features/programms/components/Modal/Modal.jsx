import { useState } from 'react';
import { XCircle } from 'phosphor-react';

import { useSearchExerciseMutation } from 'features/exercises';
import { SearchForm, SEARCH_TYPES } from 'components/Searchbar';
import { Repetitions } from '../Repetitions/Repetitions';
import styles from './Modal.module.css';

export const Modal = ({ close }) => {
	const [sliderVal, setSliderVal] = useState(1);
	const [search, result] = useSearchExerciseMutation();

	const handleRange = (e) => {
		setSliderVal(e.target.value);
	};

	return (
		<div className={styles.modal}>
			<div className={styles.modalContainer}>
				<div className={styles.modalHeader}>
					<h2>Add an Exercise</h2>
					<button onClick={() => close(false)} className={styles.closeBtn}>
						<XCircle size={20} />
					</button>
				</div>
				<div className={styles.exerciseSearch}>
					<p>Choose an Exercise</p>
					<SearchForm
						width={SEARCH_TYPES.max}
						searchFn={search}
						results={result}
					/>
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
					<p>Number of Repetitions:</p>
					<Repetitions sets={sliderVal} />
				</div>
			</div>
		</div>
	);
};
