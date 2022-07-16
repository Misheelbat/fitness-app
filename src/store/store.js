import { configureStore } from '@reduxjs/toolkit';
import { tabReducer } from 'features/exercises';

export const store = configureStore({ reducer: { tab: tabReducer } });
