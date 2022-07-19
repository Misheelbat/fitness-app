import { CaretLeft, CaretRight } from 'phosphor-react';
import { calcCurrentNumber } from 'features/exercises';
import styles from './PageBtn.module.css';

export const PageBtn = ({ totalPages = 0, currentPage, setPage }) => {
	const currentNumber = calcCurrentNumber(totalPages, currentPage);

	const prevPage = () => {
		if (currentPage === 0) return;
		setPage((prev) => prev - 1);
	};
	const nextPage = () => {
		if (currentNumber === totalPages) return;
		setPage((prev) => prev + 1);
	};

	return (
		<div className={styles.arrowsBtns}>
			<button onClick={prevPage} disabled={currentPage === 0}>
				<CaretLeft weight="bold" />
			</button>
			<button onClick={nextPage} disabled={currentNumber === totalPages}>
				<CaretRight weight="bold" />
			</button>
		</div>
	);
};
