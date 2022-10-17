import { useEffect, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import Select from 'react-select';

import {
	setSubCategory,
	selectSubCategory,
	selectCategoryUrl,
	useGetCategoryQuery,
} from 'features/exercises';

import styles from './dropdownstyle';

export let SubCategoryDropdown = ({ resetPage }) => {
	const dispatch = useDispatch();
	const categoryUrl = useSelector(selectCategoryUrl);
	const subCategory = useSelector(selectSubCategory);
	const { data, isLoading, isSuccess } = useGetCategoryQuery(categoryUrl);

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

SubCategoryDropdown = memo(SubCategoryDropdown);
