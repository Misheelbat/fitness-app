import { useCallback } from 'react';
import { useQuery } from 'react-query';

import { fetchData } from './fetchData';

const extractCategory = (category) => ({
	value: category.name,
	label: category.name_en
		? `${category.name} (${category.name_en})`
		: category.name,
});

export const useCategory = (activeTab) => {
	const URL = process.env.REACT_APP_BASE_URL + activeTab.url;

	return useQuery(['category', activeTab.url], () => fetchData(URL), {
		refetchOnWindowFocus: false,
		enabled: Boolean(activeTab.url),
		staleTime: Infinity,

		select: useCallback(
			(data) => data.map((category) => extractCategory(category)),
			[]
		),
	});
};
