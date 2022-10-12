import { useSearchExerciseMutation, useGetExerciseDetailsQuery } from 'features/exercises';

import { SearchForm, SEARCH_TYPES } from 'components/Searchbar';
import { Card } from 'features/exercises';
import { DeleteBtn } from 'components/Elements';
import styles from './SearchExercise.module.css';

export const SearchExercise = ({ selectExerciseFn, id }) => {
	const [searchFn, result] = useSearchExerciseMutation();
	const { data, isFetching } = useGetExerciseDetailsQuery(id, {
		skip: !id,
	});

	const resetSearch = () => {
		selectExerciseFn(null);
	};

	return (
		<div>
			<SearchForm
				width={SEARCH_TYPES.max}
				searchFn={searchFn}
				results={result}
				selectExerciseFn={selectExerciseFn}
			/>
			<div className={styles.searchResult}>
				{id && (
					<>
						<Card loading={isFetching} exercise={data?.name} equipments={data?.equipment} />
						<DeleteBtn x={true} onClick={resetSearch} />
					</>
				)}
			</div>
		</div>
	);
};
