import { createSlice } from '@reduxjs/toolkit';
import { apiSlice } from 'store/api/apiSlice';

const initialState = {
	displayName: '',
	email: '',
	uid: null,
	state: '',
};
const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addMatcher(
			apiSlice.endpoints.register.matchFulfilled,
			(state, { payload }) => {
				state.displayName = payload.displayName;
				state.email = payload.email;
				state.uid = payload.uid;
			}
		);
		builder.addMatcher(
			apiSlice.endpoints.login.matchFulfilled,
			(state, { payload }) => {
				state.displayName = payload.displayName;
				state.email = payload.email;
				state.uid = payload.uid;
			}
		);
		builder.addMatcher(
			apiSlice.endpoints.signOut.matchFulfilled,
			(state, action) => {
				state.displayName = '';
				state.email = '';
				state.uid = null;
			}
		);
	},
});

export const authReducer = authSlice.reducer;
