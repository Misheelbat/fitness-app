import { useGetExerciseDetailsQuery } from 'features/exercises';

import { SearchBar, SEARCH_TYPES } from 'components/Searchbar/SearchBar';
import { Card } from 'features/exercises';
import { DeleteBtn } from 'components/Elements';
import styles from './SearchExercise.module.css';

export const SearchExercise = ({ selectExerciseFn, exerciseId }) => {
	const { data, isFetching } = useGetExerciseDetailsQuery(exerciseId, {
		skip: !exerciseId,
	});

	const unSelectExercise = () => {
		selectExerciseFn(null);
	};

	return (
		<div>
			<SearchBar width={SEARCH_TYPES.maxWidth} onResultsClick={selectExerciseFn} />
			<div className={styles.searchResult}>
				{exerciseId && (
					<>
						<Card loading={isFetching} exercise={data?.name} equipments={data?.equipment} />
						<DeleteBtn x={true} onClick={unSelectExercise} />
					</>
				)}
			</div>
		</div>
	);
};
