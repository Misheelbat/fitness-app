import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { tabReducer, exerciseReducer } from 'features/exercises';
import { modalReducer } from 'features/workout';
import { apiSlice } from './api/apiSlice';

export const reduxStore = configureStore({
	reducer: {
		tab: tabReducer,
		exercise: exerciseReducer,
		modalForm: modalReducer,
		[apiSlice.reducerPath]: apiSlice.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(apiSlice.middleware),
});

setupListeners(reduxStore.dispatch);
