import { apiSlice } from 'store/api/apiSlice';
import { getSchedulesFromDb, addEvent } from '../api/updateWorkout';

const apiWithTag = apiSlice.enhanceEndpoints({ addTagTypes: ['schedule'] });

// endpoint for updating profile data
export const schedulesApi = apiWithTag.injectEndpoints({
	endpoints: (build) => ({
		getSchedules: build.query({
			async queryFn() {
				try {
					const schedules = await getSchedulesFromDb();
					return { data: schedules };
				} catch (err) {
					return { error: err.message };
				}
			},
		}),
		addEventToSchedule: build.mutation({
			async queryFn(arg) {
				try {
					await addEvent(arg);
					return { data: 'added event' };
				} catch (err) {
					return { error: err.message };
				}
			},
		}),
	}),
});

export const { useGetSchedulesQuery, useAddEventToScheduleMutation } = schedulesApi;
