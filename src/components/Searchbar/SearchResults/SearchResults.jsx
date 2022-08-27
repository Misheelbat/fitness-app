import { useRef, useCallback } from 'react';

import { useClickedOutside } from 'hooks/useClickedOutside';
import styles from './SearchResults.module.css';

export const SearchResults = ({ data, setShowResults, selectFn }) => {
	const searchRef = useRef();

	const closeSearchResults = useCallback(
		() => setShowResults(false),
		[setShowResults]
	);

	useClickedOutside(searchRef, closeSearchResults);

	const handleClick = (exercise) => {
		closeSearchResults();
		selectFn(exercise);
	};

	if (!data) {
		return null;
	}

	if (data.length === 0) {
		return (
			<div ref={searchRef} className={styles.searchResults}>
				<div className={styles.results}>Nothing Found</div>
			</div>
		);
	}

	return (
		<div ref={searchRef} className={styles.searchResults}>
			{data &&
				data.map((ex) => (
					<div
						className={styles.results}
						key={ex.value}
						onClick={() => handleClick(ex.data.id)}
					>
						{ex.value}
					</div>
				))}
		</div>
	);
};
