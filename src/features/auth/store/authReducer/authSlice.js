import { createSlice } from '@reduxjs/toolkit';
import { useLazyChangeNameQuery } from 'features/users';
import { apiSlice } from 'store/api/apiSlice';

const initialState = {
	displayName: '',
	email: '',
	uid: null,
};
const authSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addMatcher(
			apiSlice.endpoints.changeName.matchFulfilled,
			(state, { payload }) => {
				state.displayName = payload.displayName;
			}
		);
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
		builder.addMatcher(
			apiSlice.endpoints.loginAnonym.matchFulfilled,
			(state, { payload }) => {
				state.displayName = payload.displayName;
				state.email = payload.email;
				state.uid = payload.uid;
			}
		);
	},
});

export const authReducer = authSlice.reducer;
