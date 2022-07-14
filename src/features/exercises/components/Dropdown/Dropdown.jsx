import Select from 'react-select';
import { useCategory } from 'features/exercises';

import styles from './dropdownstyle';
export const Dropdown = () => {
	const { data, isSuccess } = useCategory('https://wger.de/api/v2/muscle/');

	const handleChange = (selected) => {
		console.log(selected);
	};

	if (!isSuccess) {
		return <div>error</div>;
	}

	return (
		<Select
			defaultValue={data[0]}
			options={data}
			onChange={handleChange}
			styles={styles}
		/>
	);
};
