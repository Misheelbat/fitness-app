import { createAsyncThunk } from '@reduxjs/toolkit';
import { getWorkoutsFromDb } from 'utils';

const fetchWorkouts = createAsyncThunk('/workouts/fetch', () => {
	try {
    const response = await getWorkoutsFromDb()
    return response
	} catch (error) {
    return error.message
  }
});
