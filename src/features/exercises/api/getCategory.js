// import { useQuery } from 'react-query';
// import { fetchData } from './fetchData';

export const extractCategory = (categories) => {
	return categories.results.map((category) => ({
		value: category.name,
		label: category.name_en
			? `${category.name} (${category.name_en})`
			: category.name,
		id: category.id,
	}));
};

// export const useCategory = (activeTab) => {
// 	const URL = process.env.REACT_APP_BASE_URL + activeTab.url;

// 	return useQuery(['category', activeTab.url], () => fetchData(URL), {
// 		refetchOnWindowFocus: false,
// 		enabled: Boolean(activeTab.url),
// 		staleTime: Infinity,

// 		select: extractCategory,
// 	});
// };
