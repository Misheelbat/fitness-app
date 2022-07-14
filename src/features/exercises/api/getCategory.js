import { useCallback } from 'react';
import { useQuery } from 'react-query';

import { fetchData } from './fetchData';

export const useCategory = (url) => {
	return useQuery(['category'], () => fetchData(url), {
		select: useCallback(
			(data) =>
				data.map((category) => ({
					value: category.name,
					label: category.name_en
						? `${category.name} (${category.name_en})`
						: category.name,
				})),
			[]
		),
	});
};
