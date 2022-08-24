import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const workoutsAdapter = createEntityAdapter();

const initialState = workoutsAdapter.getInitialState({
	searchResultId: null,
});

const exerciseSlice = createSlice({
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
				workoutsAdapter.addOne(state, {
					id: state.searchResultId,
					reps: action.payload,
					// add name
				});
			}
		},
	},
});

export const { selectAll } = workoutsAdapter.getSelectors(
	(state) => state.modalForm
);
export const { setSets, setSearchResult, addExerciseToWorkout } =
	exerciseSlice.actions;

export const modalReducer = exerciseSlice.reducer;
