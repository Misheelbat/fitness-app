import { apiSlice } from 'store/api/apiSlice';
import {
	signoutUser,
	loginAnonymously,
	resetPassWithEmail,
	registerWithEmailAndPassword,
	loginAuthUserWithEmailAndPassword,
} from 'features/auth/api';

import { checkUserSession, createUserDocFromAuth } from 'utils';

const apiWithTag = apiSlice.enhanceEndpoints({ addTagTypes: ['user'] });
export const authApi = apiWithTag.injectEndpoints({
	endpoints: (build) => ({
		register: build.mutation({
			async queryFn(credentials) {
				try {
					const userAuth = await registerWithEmailAndPassword(credentials);
					if (!userAuth) return { error: '(/could not register)' };
					await createUserDocFromAuth(userAuth);
					return {
						data: {
							displayName: userAuth.displayName,
							email: userAuth.email,
							uid: userAuth.uid,
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
		}),
		login: build.mutation({
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
		}),
		loginAnonym: build.mutation({
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
		signOut: build.mutation({
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
		resetPassword: build.mutation({
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
				console.log('isUserAuthenticated ran');
				try {
					const userAuth = await checkUserSession();
					if (!userAuth) return { error: 'User not logged in!' };

					const userSnapshot = await createUserDocFromAuth(userAuth);
					const { displayName, email } = userSnapshot.data();
					if (!displayName || !email) {
						return { data: { displayName: 'Guest', email: 'guest@email.com', uid: userAuth.uid } };
					}
					return { data: { displayName, email, uid: userAuth.uid } };
				} catch (err) {
					return { error: err.message };
				}
			},
			providesTags: (result, error, arg) => [
				{
					type: 'user',
				},
			],
		}),
	}),
});

export const {
	useResetPasswordMutation,
	useSignOutMutation,
	useRegisterMutation,
	useLoginMutation,
	useLoginAnonymMutation,
	useIsUserAuthenticatedQuery,
	useLazyIsUserAuthenticatedQuery,
} = authApi;
