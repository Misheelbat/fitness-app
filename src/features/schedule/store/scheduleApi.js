import { apiSlice } from 'store/api/apiSlice';
import {
	getSchedulesFromDb,
	addEvent,
	changeEventStatus,
	deleteEventFromSchedules,
} from '../api/updateWorkout';

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
			providesTags: (result, error, arg) => {
				const schedules = Object.keys(result);
				if (schedules.length !== 0) {
					return [
						{ type: 'schedule', id: 'LIST' },
						...schedules.map((date) => ({ type: 'schedule', id: date })),
					];
				}
				return [{ type: 'schedule', id: 'LIST' }];
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
			invalidatesTags: (result, error, arg) => [{ type: 'schedule', id: arg.id }],
		}),
		deleteEvent: build.mutation({
			async queryFn(id) {
				if (!id) return { error: 'No date selected' };
				try {
					await deleteEventFromSchedules(id);
					return { data: 'event deleted' };
				} catch (err) {
					return { error: err.message };
				}
			},
			invalidatesTags: (result, error, arg) => [{ type: 'schedule', id: 'LIST' }],
		}),
	}),
});

export const {
	useGetSchedulesQuery,
	useAddEventToScheduleMutation,
	useUpdateEventStatusMutation,
	useDeleteEventMutation,
} = schedulesApi;
