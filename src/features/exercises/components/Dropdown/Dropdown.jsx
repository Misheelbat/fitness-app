import { useEffect } from 'react';
import Select from 'react-select';

import { useSelector, useDispatch } from 'react-redux/es/exports';
import { setSubCategory, useGetCategoryQuery } from 'features/exercises';

import styles from './dropdownstyle';

export const Dropdown = () => {
	const dispatch = useDispatch();
	const { category, subCategory } = useSelector((state) => state.tab);
	const { data, isLoading, isSuccess } = useGetCategoryQuery(category);

	const handleChange = (e) => {
		dispatch(setSubCategory(e));
	};

	useEffect(() => {
		if (data && Array.isArray(data)) {
			dispatch(setSubCategory(data[0]));
		}
	}, [dispatch, data]);

	if (isLoading) {
		return <Select isLoading={true} styles={styles} />;
	}

	return (
		isSuccess && (
			<Select
				value={subCategory}
				isLoading={isLoading}
				options={data}
				onChange={handleChange}
				styles={styles}
			/>
		)
	);
};
