import { useSelector } from 'react-redux';
import { CaretLeft, CaretRight } from 'phosphor-react';

import {
	selectCategory,
	selectSubCategory,
	useGetExercisesQuery,
} from 'features/exercises';
import { Dropdown } from '../Dropdown/Dropdown';
import { Card } from '../Card/Card';

import styles from './ExerciseList.module.css';

export const ExerciseList = () => {
	const category = useSelector(selectCategory);
	const subCategory = useSelector(selectSubCategory);

	// const  data  = useGetExercisesQuery(
	// 	{ category, subCategory.id },
	// 	{ skip: subCategory.id === null }
	// );
	return (
		<div className={styles.exerciseList}>
			<Dropdown />
			<div className={styles.info}>
				<div className={styles.arrowsBtns}>
					<button>
						<CaretLeft />
					</button>
					<button>
						<CaretRight />
					</button>
				</div>
				<p>9 of 19 showing</p>
			</div>
			<p className={styles.selected}>
				{category} - {subCategory.value}
			</p>
			<Card />
		</div>
	);
};
