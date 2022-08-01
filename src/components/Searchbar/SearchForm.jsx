import { useState } from 'react';
import { toast } from 'react-toastify';
import { MagnifyingGlass } from 'phosphor-react/dist/';

import { Spinner } from 'components/Elements';
import { SearchResults } from './SearchResults/SearchResults';
import styles from './SearchForm.module.css';

export const SEARCH_TYPES = {
	max: '100%',
};

export const SearchForm = ({ width, searchFn, results }) => {
	const [term, setTerm] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		try {
			if (term) {
				searchFn(term);
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
						<Spinner className={styles.spinn} size="16" />
					) : (
						<MagnifyingGlass className={styles.icon} />
					)}
					<input
						id="search"
						type="search"
						name="search"
						value={term}
						onChange={(e) => setTerm(e.target.value)}
						placeholder="Search"
					/>
				</label>
			</form>
			<SearchResults data={results?.data} />
		</div>
	);
};
