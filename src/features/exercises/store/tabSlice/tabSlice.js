import { createSlice } from '@reduxjs/toolkit';
import { initialTab } from 'features/exercises';

const tabSlice = createSlice({
	name: 'tab',
	initialState: initialTab,
	reducers: {
		setCategory: (state, action) => {
			state.category = action.payload;
		},
		setSubCategory: (state, action) => {
			state.subCategory = action.payload;
		},
	},
});
export const { setCategory, setSubCategory } = tabSlice.actions;

export const tabReducer = tabSlice.reducer;
