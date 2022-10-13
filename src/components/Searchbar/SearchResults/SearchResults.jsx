import { Spinner } from 'components/Elements';
import styles from './SearchResults.module.css';

export const SearchResults = ({ data, onClick, loading }) => {
	let content;
	if (loading) content = <Spinner />;
	if (!data) return null;

	// search found nothing
	if (data && data.length === 0) content = <div className={styles.results}>Nothing Found</div>;

	// search found data
	if (data && data.length !== 0) {
		content = data.map((ex) => (
			<div className={styles.results} key={ex.data.id} onClick={() => handleClick(ex.data.id)}>
				{ex.value}
			</div>
		));
	}

	const handleClick = (exercise) => {
		onClick(exercise);
	};
	return <div className={styles.searchResults}>{content}</div>;
};
