import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	sets: 1,
};

const exerciseSlice = createSlice({
	name: 'modalForm',
	initialState,
	reducers: {
		setSets: (state, action) => {
			state.sets = action.payload;
		},
	},
});
export const { setSets } = exerciseSlice.actions;

export const modalReducer = exerciseSlice.reducer;
