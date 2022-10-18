import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';

import {
	selectSubCategory,
	selectCategoryName,
	useGetExercisesQuery,
} from 'features/exercises';

import { PageCounter } from './Counter/PageCounter';
import { PageBtn } from './PageBtn/PageBtn';
import { CardsList } from '../CardsList/CardsList';
import { SubCategoryDropdown } from '../Dropdown/SubCategoryDropdown';

import styles from './ExerciseList.module.css';

export const ExerciseList = () => {
	const [page, setPage] = useState(0);
	const category = useSelector(selectCategoryName);
	const { value, id } = useSelector(selectSubCategory);

	const { data, isLoading } = useGetExercisesQuery(
		{ category, subCategory: id, page },
		{ skip: id === null }
	);

	const resetPage = useCallback(() => setPage(0), []);
	return (
		<div className={styles.exerciseList}>
			<SubCategoryDropdown resetPage={resetPage} />
			<div className={styles.info}>
				<PageBtn
					setPage={setPage}
					totalPages={data?.count}
					currentPage={page}
				/>
				<PageCounter counter={data?.count} page={page} />
			</div>
			<p className={styles.activeCategory}>
				{category} - {value}
			</p>
			<CardsList isLoading={isLoading} cards={data?.results} />
		</div>
	);
};
