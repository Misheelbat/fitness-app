import { CaretLeft, CaretRight } from 'phosphor-react';
import styles from './SetsBtn.module.css';

export const SetsBtn = ({ prev, next }) => {
	const prevPage = () => {
		prev();
	};
	const nextPage = () => {
		next();
	};

	return (
		<div className={styles.arrowsBtns}>
			<button onClick={prevPage}>
				<CaretLeft weight="bold" />
			</button>
			<button onClick={nextPage}>
				<CaretRight weight="bold" />
			</button>
		</div>
	);
};
