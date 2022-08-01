import styles from './SearchResults.module.css';

export const SearchResults = ({ data }) => {
	if (!data) {
		return null;
	}
	if (data.suggestions === undefined) {
		return <div className={styles.searchResults}>nothing found</div>;
	}
	return (
		<div className={styles.searchResults}>
			{data.suggestions &&
				data.suggestions.map((ex) => (
					<div className={styles.result} key={ex.value}>
						{ex.value}
					</div>
				))}
		</div>
	);
};
