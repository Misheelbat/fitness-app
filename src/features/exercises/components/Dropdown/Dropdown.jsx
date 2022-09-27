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

export let Dropdown = ({ resetPage }) => {
	const dispatch = useDispatch();
	const url = useSelector(selectCategoryUrl);
	const subCategory = useSelector(selectSubCategory);
	const { data, isLoading, isSuccess } = useGetCategoryQuery(url);

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
