import { apiSlice } from 'store/api/apiSlice';

const apiWithTag = apiSlice.enhanceEndpoints({
	addTagTypes: ['exercises', 'singleExercise'],
});

// endpoint for exercises with pagination
const exerciseApi = apiWithTag.injectEndpoints({
	endpoints: (build) => ({
		getExercises: build.query({
			query: ({ category, subCategory, page = 0 }) => {
				const offset = page * 5;
				return `exercise/?language=2&limit=${5}&${category}=${subCategory}&offset=${offset}`;
			},
			providesTags: (result, error, arg) => [
				{
					type: 'exercises',
					id: arg.subCategory,
				},
			],
		}),
		getSingleExercise: build.query({
			query: (id) => `exerciseinfo/${id}`,
			providesTags: (result, error, arg) => [
				{
					type: 'singleExercise',
					id: arg,
				},
			],
		}),
	}),
	overrideExisting: false,
});

export const { useGetExercisesQuery, useGetSingleExerciseQuery } = exerciseApi;
