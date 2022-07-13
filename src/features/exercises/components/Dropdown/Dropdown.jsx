import { useQuery } from 'react-query';
import { getData } from 'features/exercises/api/getCategory';
import styles from './Dropdown.module.css';

export const Dropdown = () => {
	const { data } = useQuery('category', () =>
		getData('https://wger.de/api/v2/muscle/')
	);
	return (
		<div className={styles.dropdown}>
			{data?.results.map((d) => (
				<div>{d.name_en}</div>
			))}
		</div>
	);
};
