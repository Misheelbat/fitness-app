import { apiSlice } from 'store/api/apiSlice';

const apiWithTag = apiSlice.enhanceEndpoints({ addTagTypes: ['exercise'] });

const exerciseApi = apiWithTag.injectEndpoints({
	endpoints: (build) => ({
		getExercises: build.query({
			query: ({ category, subCategory }) =>
				`exercise/?language=2&${category}=${subCategory}`,

			providesTags: ['exercise'],

			// transformResponse: () => {},
		}),
	}),
	overrideExisting: false,
});

export const { useGetExercisesQuery } = exerciseApi;
