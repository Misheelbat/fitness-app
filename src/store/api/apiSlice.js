import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
	reducerPath: 'appApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'https://wger.de/api/v2/' }),
	endpoints: () => ({}),
});
