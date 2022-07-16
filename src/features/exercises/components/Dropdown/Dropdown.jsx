import { useState, useEffect } from 'react';
import Select from 'react-select';
import { useCategory } from 'features/exercises';
import { useExercise } from 'features/exercises';

import styles from './dropdownstyle';
export const Dropdown = () => {
	const { activeTab } = useExercise();
	const { data, isLoading, isSuccess } = useCategory(activeTab);
	const [sel, setSel] = useState();

	useEffect(() => {
		if (data) {
			setSel(data);
		}
	}, [data]);

	const handleChange = (e) => {
		setSel(e);
	};

	if (!isSuccess) {
		return <Select isLoading={true} styles={styles} />;
	}
	return (
		<Select
			value={sel}
			isLoading={isLoading}
			options={data}
			onChange={handleChange}
			styles={styles}
		/>
	);
};
