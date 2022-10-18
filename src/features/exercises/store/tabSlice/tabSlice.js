import { createSlice } from '@reduxjs/toolkit';

const initialTab = {
	category: { name: 'Muscles', id: 1, url: 'muscle' },
	subCategory: { value: null, id: null, label: null },
};

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
