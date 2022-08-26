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
			state.searchResultId = action.payload.id;
		},
		addExerciseToWorkout: (state, action) => {
			if (!state.searchResultId) {
				throw new Error('Please select an exercise');
			} else {
				setsAdapter.addOne(state, {
					id: state.searchResultId,
					reps: action.payload,
				});
				state.searchResultId = null;
			}
		},
	},
	extraReducers: (builder) => {
		builder.addMatcher(
			apiSlice.endpoints.getWorkouts.matchFulfilled,
			(state, { payload }) => {
				const workoutEntries = payload.id.map((workout) => {
					return { id: workout, workouts: setsAdapter.getInitialState() };
				});
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
