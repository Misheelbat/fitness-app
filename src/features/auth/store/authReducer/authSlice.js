import { createSlice } from '@reduxjs/toolkit';
import { authApi } from '../api/authApiSlice';
import { userApi } from 'features/users';

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
			userApi.endpoints.changeEmail.matchFulfilled,
			(state, { payload }) => {
				state.email = payload.email;
			}
		);
		builder.addMatcher(
			userApi.endpoints.changeName.matchFulfilled,
			(state, { payload }) => {
				state.displayName = payload.displayName;
			}
		);
		builder.addMatcher(
			authApi.endpoints.register.matchFulfilled,
			(state, { payload }) => {
				state.displayName = payload.displayName;
				state.email = payload.email;
				state.uid = payload.uid;
			}
		);
		builder.addMatcher(
			authApi.endpoints.login.matchFulfilled,
			(state, { payload }) => {
				state.displayName = payload.displayName;
				state.email = payload.email;
				state.uid = payload.uid;
			}
		);
		builder.addMatcher(
			authApi.endpoints.signOut.matchFulfilled,
			(state, action) => {
				state.displayName = '';
				state.email = '';
				state.uid = null;
			}
		);
		builder.addMatcher(
			authApi.endpoints.loginAnonym.matchFulfilled,
			(state, { payload }) => {
				state.displayName = payload.displayName;
				state.email = payload.email;
				state.uid = payload.uid;
			}
		);
		builder.addMatcher(
			authApi.endpoints.isUserAuthenticated.matchFulfilled,
			(state, { payload }) => {
				state.displayName = payload.displayName;
				state.email = payload.email;
				state.uid = payload.uid;
			}
		);
	},
});

export const authReducer = authSlice.reducer;
