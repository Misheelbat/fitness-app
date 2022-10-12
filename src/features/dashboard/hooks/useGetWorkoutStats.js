import { isThisWeek, isThisMonth, isThisYear, getDaysInMonth, getDaysInYear } from 'date-fns';

import { useGetSchedulesQuery, EVENT_STATUS } from 'features/schedule';
import { DEFAULT_TIMEFRAMES } from 'features/dashboard/assets';

export const useGetWorkoutStats = (timeFrame = DEFAULT_TIMEFRAMES.week) => {
	const { data: schedules, isSuccess } = useGetSchedulesQuery();

	let workoutsInTimeFrame = [];
	let nCompletedWorkouts = 0;
	let nIncompletedWorkouts = 0;
	let nTobeCompletedWorkouts = 0;
	let restDays = 7;

	if (!isSuccess || !schedules)
		return {
			workoutNumber: workoutsInTimeFrame.length,
			nCompletedWorkouts,
			nIncompletedWorkouts,
			nTobeCompletedWorkouts,
			restDays,
		};

	const calcWorkoutStats = (status) => {
		if (status === EVENT_STATUS.complete) {
			nCompletedWorkouts++;
			return;
		}
		if (status === EVENT_STATUS.inComplete) {
			nIncompletedWorkouts++;
			return;
		}
		if (status === EVENT_STATUS.tobeCompleted) {
			nTobeCompletedWorkouts++;
			return;
		}
	};

	const allWorkoutsInCalendar = Object.values(schedules);
	switch (timeFrame) {
		case DEFAULT_TIMEFRAMES.week:
			workoutsInTimeFrame = allWorkoutsInCalendar.filter((event) => {
				if (isThisWeek(new Date(event.id), { weekStartsOn: 1 })) {
					calcWorkoutStats(event.status);
					return true;
				} else {
					return false;
				}
			});
			restDays = restDays - workoutsInTimeFrame.length;
			break;

		case DEFAULT_TIMEFRAMES.month:
			workoutsInTimeFrame = allWorkoutsInCalendar.filter((event) => {
				if (isThisMonth(new Date(event.id), { weekStartsOn: 1 })) {
					calcWorkoutStats(event.status);
					return true;
				} else {
					return false;
				}
			});
			const numberOfDaysInCurrentMonth = getDaysInMonth(new Date());
			restDays = numberOfDaysInCurrentMonth - workoutsInTimeFrame.length;
			break;

		case DEFAULT_TIMEFRAMES.year:
			workoutsInTimeFrame = allWorkoutsInCalendar.filter((event) => {
				if (isThisYear(new Date(event.id), { weekStartsOn: 1 })) {
					calcWorkoutStats(event.status);
					return true;
				} else {
					return false;
				}
			});
			const numberOfDaysInCurrentYear = getDaysInYear(new Date());
			restDays = numberOfDaysInCurrentYear - workoutsInTimeFrame.length;
			break;

		default:
			break;
	}
	return {
		workoutNumber: workoutsInTimeFrame.length,
		nCompletedWorkouts,
		nIncompletedWorkouts,
		nTobeCompletedWorkouts,
		restDays,
	};
};
