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

export let SubCategoryDropdown = ({ resetToPageZero }) => {
	const dispatch = useDispatch();
	const categoryUrl = useSelector(selectCategoryUrl);
	const subCategory = useSelector(selectSubCategory);
	const {
		data: subCategories,
		isLoading,
		isSuccess,
	} = useGetCategoryQuery(categoryUrl);

	const handleChange = (e) => {
		dispatch(setSubCategory(e));
		resetToPageZero();
	};

	useEffect(() => {
		if (subCategories && Array.isArray(subCategories)) {
			dispatch(setSubCategory(subCategories[0]));
			resetToPageZero();
		}
	}, [dispatch, subCategories, resetToPageZero]);

	if (isLoading) {
		return <Select isLoading={true} styles={styles} />;
	}

	return (
		isSuccess && (
			<Select
				value={subCategory}
				isLoading={isLoading}
				options={subCategories}
				onChange={handleChange}
				styles={styles}
			/>
		)
	);
};

SubCategoryDropdown = memo(SubCategoryDropdown);
