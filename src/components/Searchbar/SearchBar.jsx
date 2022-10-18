import { useState } from 'react';
import cx from 'classnames';
import { useSearchExerciseMutation } from 'features/exercises';

import { SearchForm } from './SearchForm/SearchForm';
import { SearchResults } from './SearchResults/SearchResults';

import styles from './SearchBar.module.css';

export const SearchBar = ({ width, onResultsClick, className }) => {
	const [openResult, setOpenResults] = useState(false);
	const [searchFn, results] = useSearchExerciseMutation();

	const selectExercise = (exercise) => {
		setOpenResults(false);
		onResultsClick(exercise);
	};
	return (
		<div className={cx(styles.searchBar, className)} style={{ width: width }}>
			<SearchForm
				searchFn={searchFn}
				results={results}
				closeResults={setOpenResults}
			/>
			{openResult && (
				<SearchResults
					loading={results.isFetching}
					data={results.data?.suggestions}
					onClick={selectExercise}
				/>
			)}
		</div>
	);
};
export const SEARCH_TYPES = {
	maxWidth: '100%',
};
