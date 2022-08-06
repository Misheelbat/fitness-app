import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	sets: 1,
	searchResultId: null,
};

const exerciseSlice = createSlice({
	name: 'modalForm',
	initialState,
	reducers: {
		setSets: (state, action) => {
			state.sets = action.payload;
		},
		setSearchResult: (state, action) => {
			state.searchResultId = action.payload.id;
		},
		addExerciseToWorkout: (state, action) => {
			console.log({ [state.searchResultId]: '2/2' });
		},
	},
});
export const { setSets, setSearchResult, addExerciseToWorkout } =
	exerciseSlice.actions;

export const modalReducer = exerciseSlice.reducer;
