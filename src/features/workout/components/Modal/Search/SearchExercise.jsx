import { useSelector, useDispatch } from 'react-redux';

import { setSearchResult, selectSearchResult } from 'features/workout/store';
import {
	useSearchExerciseMutation,
	useGetExerciseDetailsQuery,
} from 'features/exercises';

import { SearchForm, SEARCH_TYPES } from 'components/Searchbar';
import { Card } from 'features/exercises';

import styles from './SearchExercise.module.css';

export const SearchExercise = () => {
	const dispatch = useDispatch();
	const id = useSelector(selectSearchResult);
	const [search, result] = useSearchExerciseMutation();

	const { data, isFetching } = useGetExerciseDetailsQuery(id, {
		skip: id === null,
	});

	const selectFn = (exerciseId) => {
		dispatch(setSearchResult(exerciseId));
	};

	return (
		<div>
			<SearchForm
				width={SEARCH_TYPES.max}
				searchFn={search}
				results={result}
				selectFn={selectFn}
			/>
			<div className={styles.searchResult}>
				{data && (
					<Card
						loading={isFetching}
						exercise={data.name}
						equipments={data.equipment}
					/>
				)}
			</div>
		</div>
	);
};
