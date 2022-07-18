import { useSelector } from 'react-redux';
import { CaretLeft, CaretRight } from 'phosphor-react';

import {
	selectCategory,
	selectSubCategory,
	useGetExercisesQuery,
} from 'features/exercises';
import { Dropdown } from '../Dropdown/Dropdown';
import { CardsList } from '../CardsList/CardsList';
import styles from './ExerciseList.module.css';
import { useState } from 'react';

export const ExerciseList = () => {
	const [page, setPage] = useState(0);
	const category = useSelector(selectCategory);
	const { value, id } = useSelector(selectSubCategory);
	const res = useGetExercisesQuery(
		{ category, subCategory: id, page },
		{ skip: id === null }
	);

	const prevPage = () => {
		if (page === 0) return;
		setPage((prev) => prev - 1);
	};
	const nextPage = () => {
		if (res.data?.next === null) return;
		setPage((prev) => prev + 1);
	};
	return (
		<div className={styles.exerciseList}>
			<Dropdown />
			<div className={styles.info}>
				<div className={styles.arrowsBtns}>
					<button onClick={prevPage} disabled={page === 0}>
						<CaretLeft weight="bold" />
					</button>
					<button onClick={nextPage} disabled={res.data?.next === null}>
						<CaretRight weight="bold" />
					</button>
				</div>
				<p>9 of 19 showing</p>
			</div>
			<p className={styles.selected}>
				{category} - {value}
			</p>
			<CardsList cards={res.data?.results} />
		</div>
	);
};
