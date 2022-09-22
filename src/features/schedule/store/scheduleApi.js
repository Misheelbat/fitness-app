import { apiSlice } from 'store/api/apiSlice';
import { getSchedulesFromDb, addEvent, changeEventStatus } from '../api/updateWorkout';

const apiWithTag = apiSlice.enhanceEndpoints({ addTagTypes: ['schedule'] });

export const schedulesApi = apiWithTag.injectEndpoints({
	endpoints: (build) => ({
		getSchedules: build.query({
			async queryFn() {
				try {
					const schedules = await getSchedulesFromDb();
					console.log('get schedules ran');
					return { data: schedules };
				} catch (err) {
					return { error: err.message };
				}
			},
			providesTags: [{ type: 'schedule', id: 'LIST' }],
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
			invalidatesTags: [{ type: 'schedule', id: 'LIST' }],
		}),
		updateEventStatus: build.mutation({
			async queryFn(arg) {
				try {
					await changeEventStatus(arg);
					return { data: 'added event' };
				} catch (err) {
					return { error: err.message };
				}
			},
			invalidatesTags: [{ type: 'schedule', id: 'LIST' }],
		}),
	}),
});

export const { useGetSchedulesQuery, useAddEventToScheduleMutation, useUpdateEventStatusMutation } =
	schedulesApi;
