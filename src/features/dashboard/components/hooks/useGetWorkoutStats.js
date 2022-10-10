import { isThisWeek, isThisMonth, isThisYear } from 'date-fns';

import { useGetSchedulesQuery, EVENT_STATUS } from 'features/schedule';
import { DEFAULT_TIMEFRAMES } from 'features/dashboard/assets';

const completedWorkout = (e) => e === EVENT_STATUS.complete;
const inCompletedWorkout = (e) => e === EVENT_STATUS.inComplete;
const tobeCompletedWorkout = (e) => e === EVENT_STATUS.tobeCompleted;

export const useGetWorkoutStats = (timeFrame = DEFAULT_TIMEFRAMES.week) => {
	const { data: schedules, isSuccess } = useGetSchedulesQuery();
	let nOfWorkout = [];
	let nCompletedWorkouts = 0;
	let nIncompletedWorkouts = 0;
	let nTobeCompletedWorkouts = 0;

	if (!isSuccess || !schedules)
		return {
			workoutNumber: nOfWorkout.length,
			nCompletedWorkouts,
			nIncompletedWorkouts,
			nTobeCompletedWorkouts,
		};

	switch (timeFrame) {
		case DEFAULT_TIMEFRAMES.week:
			nOfWorkout = Object.values(schedules).filter((event) => {
				if (isThisWeek(new Date(event.id), { weekStartsOn: 1 })) {
					if (completedWorkout(event.status)) nCompletedWorkouts++;
					if (inCompletedWorkout(event.status)) nIncompletedWorkouts++;
					if (tobeCompletedWorkout(event.status)) nTobeCompletedWorkouts++;
					return true;
				} else {
					return false;
				}
			});
			break;
		case DEFAULT_TIMEFRAMES.month:
			nOfWorkout = Object.values(schedules).filter((event) => {
				if (isThisMonth(new Date(event.id), { weekStartsOn: 1 })) {
					if (completedWorkout(event.status)) nCompletedWorkouts++;
					if (inCompletedWorkout(event.status)) nIncompletedWorkouts++;
					if (tobeCompletedWorkout(event.status)) nTobeCompletedWorkouts++;
					return true;
				} else {
					return false;
				}
			});
			break;
		case DEFAULT_TIMEFRAMES.year:
			nOfWorkout = Object.values(schedules).filter((event) => {
				if (isThisYear(new Date(event.id), { weekStartsOn: 1 })) {
					if (completedWorkout(event.status)) nCompletedWorkouts++;
					if (inCompletedWorkout(event.status)) nIncompletedWorkouts++;
					if (tobeCompletedWorkout(event.status)) nTobeCompletedWorkouts++;
					return true;
				} else {
					return false;
				}
			});
			break;

		default:
			break;
	}
	return {
		workoutNumber: nOfWorkout.length,
		nCompletedWorkouts,
		nIncompletedWorkouts,
		nTobeCompletedWorkouts,
	};
};
