import { apiSlice } from 'store/api/apiSlice';
import { getWorkoutsFromDoc } from 'utils';

const apiWithTag = apiSlice.enhanceEndpoints({ addTagTypes: ['workouts'] });

// endpoint for fetching available subCategory options
const workoutApi = apiWithTag.injectEndpoints({
	endpoints: (build) => ({
		getWorkouts: build.query({
			async queryFn() {
				const data = await getWorkoutsFromDoc();
				console.log('red', data);
				return { data };
			},
		}),
	}),
	overrideExisting: false,
});

export const { useGetWorkoutsQuery } = workoutApi;
