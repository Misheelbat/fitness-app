import { useRef, useCallback } from 'react';
import styles from './SearchResults.module.css';
import { useClickedOutside } from 'hooks/useClickedOutside';
export const SearchResults = ({ data, setIsOpen, isOpen }) => {
	const searchRef = useRef();

	const closeSearchResults = useCallback(() => setIsOpen(false), [setIsOpen]);

	useClickedOutside(searchRef, closeSearchResults);

	if (!data) {
		return null;
	}

	return (
		isOpen && (
			<div ref={searchRef} className={styles.searchResults}>
				{data.suggestions &&
					data.suggestions.map((ex) => (
						<div className={styles.results} key={ex.value}>
							{ex.value ? ex.value : 'Nothing Found'}
						</div>
					))}
			</div>
		)
	);
};
