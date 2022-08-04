import { useSelector } from 'react-redux';
import { useSearchExerciseMutation } from 'features/exercises';
import { selectSets } from 'features/programms/store';
import { SearchForm, SEARCH_TYPES } from 'components/Searchbar';
import { XCircle } from 'phosphor-react';
import { Repetitions } from './Repetitions/Repetitions';
import { Slider } from './Slider/Slider';

import styles from './Modal.module.css';

export const Modal = ({ close }) => {
	const sets = useSelector(selectSets);
	const [search, result] = useSearchExerciseMutation();

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
					<p>Number of Sets: {sets}</p>
					<Slider />
				</div>
				<div className={styles.reps}>
					<p>Number of Repetitions:</p>
					<div className={styles.repsInfo}>
						If you do the same reps for all sets, you can just enter one value
					</div>
					<Repetitions sets={sets} />
				</div>
			</div>
		</div>
	);
};
