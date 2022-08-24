import { useState } from 'react';
import { toast } from 'react-toastify';
import { MagnifyingGlass } from 'phosphor-react/dist/';

import { Spinner } from 'components/Elements';
import { SearchResults } from './SearchResults/SearchResults';
import styles from './SearchForm.module.css';

export const SEARCH_TYPES = {
	max: '100%',
};

export const SearchForm = ({ width, searchFn, results, selectFn }) => {
	const [term, setTerm] = useState('');
	const [showResults, setShowResults] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();
		try {
			if (term) {
				searchFn(term);
				setShowResults(true);
				setTerm('');
			}
		} catch (error) {
			toast.error(error.message);
		}
	};

	return (
		<div className={styles.searchForm} style={{ width: width }}>
			<form onSubmit={handleSubmit}>
				<label htmlFor="search">
					{results?.isLoading ? (
						<Spinner size="16" />
					) : (
						<MagnifyingGlass className={styles.icon} />
					)}
					<input
						onFocus={() => setShowResults(true)}
						id="search"
						type="search"
						name="search"
						value={term}
						onChange={(e) => setTerm(e.target.value)}
						placeholder="Search"
					/>
				</label>
			</form>
			{showResults && (
				<SearchResults
					loading={results.isFetching}
					data={results.data?.suggestions}
					setShowResults={setShowResults}
					selectFn={selectFn}
				/>
			)}
		</div>
	);
};
