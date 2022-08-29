import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

import { apiSlice } from 'store/api/apiSlice';
import { workoutApi } from '../api/workoutsApi';

const workoutsAdapter = createEntityAdapter();
const exerciseAdaptar = createEntityAdapter();
const initialState = workoutsAdapter.getInitialState({ searchResultId: null });

const workoutsSlice = createSlice({
	name: 'workouts',
	initialState,
	reducers: {
		setSearchResult: (state, action) => {
			state.searchResultId = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addMatcher(
			apiSlice.endpoints.getWorkouts.matchFulfilled,
			(state, { payload }) => {
				if (Object.entries(payload).length === 0) return;

				const workoutEntries = payload.ids.map((workout) => ({
					id: workout,
					exercises: exerciseAdaptar.getInitialState(
						payload.entities[workout].exercises
					),
				}));
				workoutsAdapter.setAll(state, workoutEntries);
			}
		);
		builder.addMatcher(
			workoutApi.endpoints.createWorkout.matchFulfilled,
			(state, { payload }) => {
				const workout = {
					id: payload,
					exercises: exerciseAdaptar.getInitialState(),
				};
				workoutsAdapter.addOne(state, workout);
			}
		);
		builder.addMatcher(
			workoutApi.endpoints.addExerciseToWorkout.matchFulfilled,
			(state, { payload }) => {
				workoutsAdapter.addOne(state.entities[payload.title].exercises, {
					id: state.searchResultId,
					reps: payload.data.reps,
				});
				state.searchResultId = null;
			}
		);
	},
});

export const { selectAll, selectById: selectWorkoutById } =
	workoutsAdapter.getSelectors((state) => state.workouts);

export const { setSearchResult } = workoutsSlice.actions;

export const workoutsReducer = workoutsSlice.reducer;
