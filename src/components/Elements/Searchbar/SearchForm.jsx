import { useState } from 'react';
import { toast } from 'react-toastify';
import { MagnifyingGlass } from 'phosphor-react/dist/';

import { useSearchExerciseMutation } from 'features/exercises';

import styles from './SearchForm.module.css';

export const SEARCH_TYPES = {
	max: '100%',
};

export const SearchForm = ({ width }) => {
	const [searchTerm, { isError, error }] = useSearchExerciseMutation({
		fixedCacheKey: 'search',
	});
	const [term, setTerm] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		searchTerm(term);
		setTerm('');
	};

	if (isError) {
		toast.error(error.message);
	}
	return (
		<div className={styles.searchForm} style={{ width: width }}>
			<form onSubmit={handleSubmit}>
				<label htmlFor="search">
					<MagnifyingGlass />
					<input
						id="search"
						type="search"
						name={term}
						onChange={(e) => setTerm(e.target.value)}
						placeholder="Search"
					/>
				</label>
			</form>
		</div>
	);
};
