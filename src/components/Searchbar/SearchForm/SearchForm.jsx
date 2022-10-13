import { useState } from 'react';
import { toast } from 'react-toastify';

import { Spinner } from 'components/Elements';
import { MagnifyingGlass } from 'phosphor-react';

import styles from './SearchForm.module.css';
export const SearchForm = ({ searchFn, results, closeResults }) => {
	const [searchTerm, setSearchTerm] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!searchTerm) return;
		try {
			await searchFn(searchTerm);
			closeResults(true);
			setSearchTerm('');
		} catch (error) {
			toast.error(error.message);
		}
	};

	return (
		<form onSubmit={handleSubmit} className={styles.searchForm}>
			<input
				id="search exercise"
				type="search"
				name="search"
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				placeholder="Search an Exercise"
			/>
			<button disabled={results?.isLoading}>
				{results?.isLoading && <Spinner size="16" />}
				{!results?.isLoading && <MagnifyingGlass size="16" />}
			</button>
		</form>
	);
};
