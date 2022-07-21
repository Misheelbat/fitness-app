import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';

import {
	selectCategory,
	selectSubCategory,
	useGetExercisesQuery,
} from 'features/exercises';

import { Counter } from './Counter/Counter';
import { PageBtn } from './PageBtn/PageBtn';
import { CardsList } from '../CardsList/CardsList';
import { Dropdown } from '../Dropdown/Dropdown';

import styles from './ExerciseList.module.css';

export const ExerciseList = () => {
	const [page, setPage] = useState(0);
	const category = useSelector(selectCategory);
	const { value, id } = useSelector(selectSubCategory);

	const { data, isLoading } = useGetExercisesQuery(
		{ category, subCategory: id, page },
		{ skip: id === null }
	);

	const resetPage = useCallback(() => setPage(0), []);
	return (
		<div className={styles.exerciseList}>
			<Dropdown resetPage={resetPage} />
			<div className={styles.info}>
				<PageBtn
					setPage={setPage}
					totalPages={data?.count}
					currentPage={page}
				/>
				<Counter counter={data?.count} page={page} />
			</div>
			<p className={styles.activeCategory}>
				{category} - {value}
			</p>
			<CardsList isLoading={isLoading} cards={data?.results} />
		</div>
	);
};
