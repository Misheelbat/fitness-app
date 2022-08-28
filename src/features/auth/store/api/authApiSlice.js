import { apiSlice } from 'store/api/apiSlice';
import {
	registerWithEmailAndPassword,
	loginAuthUserWithEmailAndPassword,
	signoutUser,
	resetPassWithEmail,
	loginAnonymously,
} from 'features/auth/api';

import { checkUserSession, createUserDocFromAuth } from 'utils';

const apiWithTag = apiSlice.enhanceEndpoints({ addTagTypes: ['user'] });
export const authApi = apiWithTag.injectEndpoints({
	endpoints: (build) => ({
		register: build.query({
			async queryFn(credentials) {
				try {
					const data = await registerWithEmailAndPassword(credentials);
					return {
						data: {
							displayName: data.displayName,
							email: data.email,
							uid: data.uid,
						},
					};
				} catch (err) {
					return { error: err.message };
				}
			},
			providesTags: (result, error, arg) => [
				{
					type: 'user',
				},
			],
			invalidatesTags: [{ type: 'user' }],
		}),
		login: build.query({
			async queryFn(credentials) {
				try {
					const data = await loginAuthUserWithEmailAndPassword(credentials);
					return {
						data: {
							displayName: data.user.displayName,
							email: data.user.email,
							uid: data.user.uid,
						},
					};
				} catch (err) {
					return { error: err.message };
				}
			},
			providesTags: (result, error, arg) => [
				{
					type: 'user',
				},
			],
			invalidatesTags: [{ type: 'user' }],
		}),
		loginAnonym: build.query({
			async queryFn() {
				try {
					const data = await loginAnonymously();
					return {
						data: {
							displayName: 'Guest',
							email: 'Guest',
							uid: data.user.uid,
						},
					};
				} catch (err) {
					return { error: err.message };
				}
			},
			providesTags: (result, error, arg) => [
				{
					type: 'user',
				},
			],
			invalidatesTags: [{ type: 'user' }],
		}),
		signOut: build.query({
			async queryFn() {
				try {
					await signoutUser();
					return { data: 'signedOut' };
				} catch (err) {
					return { error: err.message };
				}
			},
			invalidatesTags: [{ type: 'user' }],
		}),
		resetPassword: build.query({
			async queryFn(email) {
				try {
					await resetPassWithEmail(email);
					return { data: 'Password reset email sent' };
				} catch (err) {
					return { error: err.message };
				}
			},
		}),
		isUserAuthenticated: build.query({
			async queryFn() {
				try {
					const userAuth = await checkUserSession();
					if (!userAuth) return { data: {} };

					const userSnapshot = await createUserDocFromAuth(userAuth);
					const { displayName, email } = userSnapshot.data();

					return { data: { displayName, email, uid: userAuth.uid } };
				} catch (err) {
					return { error: err.message };
				}
			},
		}),
	}),
});

export const {
	useLazyResetPasswordQuery,
	useLazySignOutQuery,
	useLazyRegisterQuery,
	useLazyLoginQuery,
	useLazyLoginAnonymQuery,
	useLazyIsUserAuthenticatedQuery,
} = authApi;
