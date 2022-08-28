import { apiSlice } from 'store/api/apiSlice';
import { updateUserDisplayName } from 'features/users';

const apiWithTag = apiSlice.enhanceEndpoints({ addTagTypes: ['name'] });

// endpoint for updating profile data
const userApi = apiWithTag.injectEndpoints({
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
	}),
});

export const { useLazyChangeNameQuery } = userApi;
