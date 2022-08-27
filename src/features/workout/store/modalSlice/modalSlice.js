import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from 'store/api/apiSlice';
const workoutsAdapter = createEntityAdapter();
const setsAdapter = createEntityAdapter();

const initialState = workoutsAdapter.getInitialState({
	searchResultId: null,
});

const workoutsSlice = createSlice({
	name: 'modalForm',
	initialState,
	reducers: {
		setSearchResult: (state, action) => {
			state.searchResultId = action.payload;
		},
		addExerciseToWorkout: (state, { payload }) => {
			if (!state.searchResultId) {
				throw new Error('Please select an exercise');
			} else {
				setsAdapter.updateOne(state, {
					id: state.searchResultId,
					reps: payload.reps,
				});
				state.searchResultId = null;
			}
		},
		addNewWorkout: (state, action) => {
			const workout = { id: '', exercises: action.payload };
			workoutsAdapter.addOne(state, workout);
		},
	},
	extraReducers: (builder) => {
		builder.addMatcher(
			apiSlice.endpoints.getWorkouts.matchFulfilled,
			(state, { payload }) => {
				if (Object.entries(payload).length === 0) return;

				const workoutEntries = payload.ids.map((workout) => ({
					id: workout,
					exercises: setsAdapter.getInitialState(
						payload.entities[workout].exercises
					),
				}));
				workoutsAdapter.setAll(state, workoutEntries);
			}
		);
	},
});

export const { selectAll, selectById: selectWorkoutById } =
	workoutsAdapter.getSelectors((state) => state.modalForm);

export const { setSets, setSearchResult, addExerciseToWorkout } =
	workoutsSlice.actions;

export const modalReducer = workoutsSlice.reducer;
