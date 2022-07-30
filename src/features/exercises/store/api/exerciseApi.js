import { apiSlice } from 'store/api/apiSlice';

const apiWithTag = apiSlice.enhanceEndpoints({
	addTagTypes: ['exercises', 'singleExercise', 'searchedTerm'],
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
		getExerciseDetails: build.query({
			query: (id) => `exerciseinfo/${id}`,
			providesTags: (result, error, arg) => [
				{
					type: 'singleExercise',
					id: arg,
				},
			],
		}),
		searchExercise: build.mutation({
			query: (term) => `exercise/search/?language=2&term=${term}`,
			providesTags: (result, error, arg) => [
				{
					type: 'searchedTerm',
					id: arg,
				},
			],
		}),
	}),
	overrideExisting: false,
});

export const {
	useGetExercisesQuery,
	useGetExerciseDetailsQuery,
	useSearchExerciseMutation,
} = exerciseApi;
