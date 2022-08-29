import { apiSlice } from 'store/api/apiSlice';

import { getWorkoutsFromDb, addWorkout, addExercise } from 'utils';
import { extractEquipment } from 'features/exercises';

const apiWithTag = apiSlice.enhanceEndpoints({ addTagTypes: ['workouts'] });

// endpoint for fetching available subCategory options
export const workoutApi = apiWithTag.injectEndpoints({
	endpoints: (build) => ({
		getWorkouts: build.query({
			async queryFn() {
				try {
					const data = await getWorkoutsFromDb();
					return { data };
				} catch (err) {
					return { error: err.message };
				}
			},
			providesTags: (result, error, arg) => [
				{
					type: 'workouts',
				},
			],
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
		createWorkout: build.mutation({
			async queryFn(args) {
				try {
					await addWorkout(args);
					return { data: args };
				} catch (err) {
					return { error: err.message };
				}
			},
			invalidatesTags: ['workouts'],
		}),
		addExerciseToWorkout: build.mutation({
			async queryFn(args) {
				try {
					if (!args.data.id) {
						return { error: 'Please select an exercise' };
					}
					await addExercise(args);
					return { data: args };
				} catch (err) {
					return {
						error: err.message,
					};
				}
			},
			invalidatesTags: ['workouts'],
		}),
	}),
});

export const {
	useLazyGetWorkoutsQuery,
	useGetWorkoutsQuery,
	useGetTableDataQuery,
	useCreateWorkoutMutation,
	useAddExerciseToWorkoutMutation,
} = workoutApi;
