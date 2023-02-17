import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	id: null,
};

const exerciseSlice = createSlice({
	name: 'exercise',
	initialState,
	reducers: {
		setExercise: (state, action) => {
			state.id = action.payload;
		},
	},
});
export const { setExercise } = exerciseSlice.actions;

export const exerciseReducer = exerciseSlice.reducer;
