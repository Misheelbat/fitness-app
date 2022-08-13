import { CaretLeft, CaretRight } from 'phosphor-react';
import styles from './ArrowBtn.module.css';

export const ArrowBtn = ({ page, setPage, total }) => {
	const prevPage = () => {
		if (page === 1) return;
		setPage(page - 1);
	};
	const nextPage = () => {
		if (page === total) return;
		setPage(page + 1);
	};

	return (
		<div className={styles.arrowsBtns}>
			<button onClick={prevPage} disabled={page === 1}>
				<CaretLeft weight="bold" />
			</button>
			<button onClick={nextPage} disabled={page === total}>
				<CaretRight weight="bold" />
			</button>
		</div>
	);
};
