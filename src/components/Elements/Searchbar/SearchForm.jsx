import { useState } from 'react';
import { MagnifyingGlass } from 'phosphor-react/dist/';

import styles from './SearchForm.module.css';

export const SEARCH_TYPES = {
	max: '100%',
};

export const SearchForm = ({ width }) => {
	const [term, setTerm] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(term);
		setTerm('');
	};
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
