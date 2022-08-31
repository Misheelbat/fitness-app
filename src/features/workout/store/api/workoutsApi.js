import { apiSlice } from 'store/api/apiSlice';

import { getWorkoutsFromDb, addWorkout, addExercise, changeWorkoutTitle } from 'utils';
import { extractEquipment } from 'features/exercises';

const apiWithTag = apiSlice.enhanceEndpoints({
	addTagTypes: ['workouts', 'exData'],
});

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
			providesTags: (result, error, arg) => {
				if (result?.ids) {
					return [{ type: 'workout', id: 'LIST' }, ...result.ids.map((id) => ({ type: 'workout', id }))];
				}
				return [{ type: 'workout', id: 'LIST' }];
			},
		}),
		getTableData: build.query({
			query: (arg) => `exerciseinfo/${arg.id}`,
			providesTags: (result, error, arg) => [
				{
					type: 'exData',
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
			invalidatesTags: [{ type: 'workout', id: 'LIST' }],
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
			invalidatesTags: [{ type: 'workout', id: 'LIST' }],
		}),
		updateWorkoutTitle: build.mutation({
			async queryFn(args) {
				try {
					if (!args.id || !args.data.id) {
						return { error: 'Please enter the new title' };
					}
					await changeWorkoutTitle(args);
					return { data: args };
				} catch (err) {
					console.log(err);
					return {
						error: err.message,
					};
				}
			},
			invalidatesTags: (result, error, arg) => [{ type: 'workout', id: arg.id }],
		}),
	}),
});

export const {
	useLazyGetWorkoutsQuery,
	useGetWorkoutsQuery,
	useGetTableDataQuery,
	useCreateWorkoutMutation,
	useAddExerciseToWorkoutMutation,
	useUpdateWorkoutTitleMutation,
} = workoutApi;
