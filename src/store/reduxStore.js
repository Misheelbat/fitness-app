import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { apiSlice } from './api/apiSlice';
import { tabReducer, exerciseReducer } from 'features/exercises';
import { workoutsReducer } from 'features/workout';
import { authReducer } from 'features/auth';

export const reduxStore = configureStore({
	reducer: {
		tab: tabReducer,
		exercise: exerciseReducer,
		workouts: workoutsReducer,
		user: authReducer,
		[apiSlice.reducerPath]: apiSlice.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(apiSlice.middleware),
});

setupListeners(reduxStore.dispatch);
