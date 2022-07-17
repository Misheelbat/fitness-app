import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { tabReducer } from 'features/exercises';
import { apiSlice } from './api/apiSlice';

export const reduxStore = configureStore({
	reducer: {
		tab: tabReducer,
		[apiSlice.reducerPath]: apiSlice.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(apiSlice.middleware),
});

setupListeners(reduxStore.dispatch);
