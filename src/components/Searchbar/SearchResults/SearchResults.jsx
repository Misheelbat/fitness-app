import { useRef, useCallback } from 'react';

import { useClickedOutside } from 'hooks/useClickedOutside';
import styles from './SearchResults.module.css';
import { Spinner } from 'components/Elements';

export const SearchResults = ({ data, setShowResults, selectFn, loading }) => {
	const searchRef = useRef();
	const closeSearchResults = useCallback(() => setShowResults(false), [setShowResults]);
	useClickedOutside(searchRef, closeSearchResults);

	const handleClick = (exercise) => {
		closeSearchResults();
		selectFn(exercise);
	};

	let content;
	if (loading) content = <Spinner />;
	if (!data) return null;

	// search found nothing
	if (data && data.length === 0) content = <div className={styles.results}>Nothing Found</div>;

	// search found data
	if (data && data.length !== 0) {
		content = data.map((ex) => (
			<div className={styles.results} key={ex.value} onClick={() => handleClick(ex.data.id)}>
				{ex.value}
			</div>
		));
	}

	return (
		<div ref={searchRef} className={styles.searchResults}>
			{content}
		</div>
	);
};
