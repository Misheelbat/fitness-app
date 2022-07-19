import { apiSlice } from 'store/api/apiSlice';
import { extractCategory } from 'features/exercises';

const apiWithTag = apiSlice.enhanceEndpoints({ addTagTypes: ['category'] });

// endpoint for fetching available subCategory options
const categoryApi = apiWithTag.injectEndpoints({
	endpoints: (build) => ({
		getCategory: build.query({
			query: (url) => url,
			providesTags: (result, error, arg) => [
				{
					type: 'category',
					id: arg,
				},
			],
			transformResponse: (categories) => extractCategory(categories),
		}),
	}),
	overrideExisting: false,
});

export const { useGetCategoryQuery } = categoryApi;
