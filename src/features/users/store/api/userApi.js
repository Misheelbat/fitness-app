import { apiSlice } from 'store/api/apiSlice';
import {
	updateUserDisplayName,
	updateUserEmail,
	updateUserPassword,
} from 'features/users';

const apiWithTag = apiSlice.enhanceEndpoints({ addTagTypes: ['name'] });

// endpoint for updating profile data
export const userApi = apiWithTag.injectEndpoints({
	endpoints: (build) => ({
		changeName: build.query({
			async queryFn(name) {
				try {
					await updateUserDisplayName(name);
					return { data: { displayName: name } };
				} catch (err) {
					return { error: err.message };
				}
			},
		}),
		changePassword: build.query({
			async queryFn(pass) {
				try {
					await updateUserPassword(pass);
					return { data: 'Password updated!' };
				} catch (err) {
					return { error: err.message };
				}
			},
		}),
		changeEmail: build.query({
			async queryFn(email) {
				try {
					await updateUserEmail(email);
					return { data: { email } };
				} catch (err) {
					return { error: err.message };
				}
			},
		}),
	}),
});

export const {
	useLazyChangeNameQuery,
	useLazyChangeEmailQuery,
	useLazyChangePasswordQuery,
} = userApi;
