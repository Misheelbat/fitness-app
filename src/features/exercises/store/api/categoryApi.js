import { apiSlice } from 'store/api/apiSlice';
import { extractCategory } from 'features/exercises';

const apiWithTag = apiSlice.enhanceEndpoints({ addTagTypes: ['category'] });

const categoryApi = apiWithTag.injectEndpoints({
	endpoints: (build) => ({
		getCategory: build.query({
			query: (url) => url,
			providesTags: ['category'],
			transformResponse: (categories) => extractCategory(categories),
		}),
	}),
	overrideExisting: false,
});

export const { useGetCategoryQuery } = categoryApi;
