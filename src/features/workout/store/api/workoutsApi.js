import { apiSlice } from 'store/api/apiSlice';
import { getWorkoutsFromDb } from 'utils';
import { extractEquipment } from 'features/exercises';

const apiWithTag = apiSlice.enhanceEndpoints({ addTagTypes: ['workouts'] });

// endpoint for fetching available subCategory options
const workoutApi = apiWithTag.injectEndpoints({
	endpoints: (build) => ({
		getWorkouts: build.query({
			async queryFn() {
				const data = await getWorkoutsFromDb();
				return { data };
			},
		}),
		getTableData: build.query({
			query: (arg) => `exerciseinfo/${arg.id}`,
			providesTags: (result, error, arg) => [
				{
					type: 'sets',
					id: arg.id,
				},
			],
			transformResponse: (response, meta, arg) => {
				return {
					name: response.name,
					category: response.category.name,
					equipments: extractEquipment(response.equipment).join(', '),
					sets: arg.reps.reps.length,
					reps: arg.reps.reps.join('/'),
				};
			},
		}),
	}),
});

export const { useGetWorkoutsQuery, useGetTableDataQuery } = workoutApi;
