import { apiSlice } from 'store/api/apiSlice';
import {
	registerWithEmailAndPassword,
	loginAuthUserWithEmailAndPassword,
	signoutUser,
} from 'features/auth/api';

const apiWithTag = apiSlice.enhanceEndpoints({ addTagTypes: ['user'] });
const authApi = apiWithTag.injectEndpoints({
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
	}),
});

export const { useLazySignOutQuery, useLazyRegisterQuery, useLazyLoginQuery } =
	authApi;
