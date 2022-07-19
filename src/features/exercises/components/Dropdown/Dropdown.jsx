import { useEffect, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import Select from 'react-select';

import { setSubCategory, useGetCategoryQuery } from 'features/exercises';

import styles from './dropdownstyle';

export let Dropdown = ({ resetPage }) => {
	const dispatch = useDispatch();
	const { category, subCategory } = useSelector((state) => state.tab);
	const { data, isLoading, isSuccess } = useGetCategoryQuery(category);

	const handleChange = (e) => {
		dispatch(setSubCategory(e));
		resetPage();
	};

	useEffect(() => {
		if (data && Array.isArray(data)) {
			dispatch(setSubCategory(data[0]));
			resetPage();
		}
	}, [dispatch, data, resetPage]);

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

Dropdown = memo(Dropdown);
