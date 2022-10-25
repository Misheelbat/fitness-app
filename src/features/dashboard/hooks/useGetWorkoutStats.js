import {
	isThisWeek,
	isThisMonth,
	isThisYear,
	getDaysInMonth,
	getDaysInYear,
	parse,
} from 'date-fns';

import { useGetSchedulesQuery, EVENT_STATUS } from 'features/schedule';
import { DEFAULT_TIMEFRAMES } from 'features/dashboard';
import { DATE_FORMAT } from 'assets/date_format';

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
				if (
					isThisWeek(parse(event.id, DATE_FORMAT, new Date()), {
						weekStartsOn: 1,
					})
				) {
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
				if (
					isThisMonth(parse(event.id, DATE_FORMAT, new Date()), {
						weekStartsOn: 1,
					})
				) {
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
				if (
					isThisYear(parse(event.id, DATE_FORMAT, new Date()), {
						weekStartsOn: 1,
					})
				) {
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

// const counts = {
// 	[EVENT_STATUS.complete]: 0,
// 	[EVENT_STATUS.inComplete]: 0,
// 	[EVENT_STATUS.tobeCompleted]: 0,
// };

// const allWorkoutsInCalendar = Object.values(schedules);
// const workoutsInTimeFrame = [];
// for (const workout of allWorkoutsInCalendar) {
// 	if (
// 		isThisTimeFrame(timeframe, parse(event.id, DATE_FORMAT, new Date()), {
// 			weekStartsOn: 1,
// 		})
// 	) {
// 		workoutsInTimeFrame.push(workout);
// 		counts[workout.status]++;
// 	}
// }


// export const useGetWorkoutStats = (timeFrame = DEFAULT_TIMEFRAMES.week) => {
// 	const { data: schedules, isSuccess } = useGetSchedulesQuery();

// 	const counts = {
// 		[EVENT_STATUS.complete]: 0,
// 		[EVENT_STATUS.inComplete]: 0,
// 		[EVENT_STATUS.tobeCompleted]: 0,
// 	};
// 	let workoutNumber = 0;
// 	let restDays = 7;

// 	if (isSuccess && schedules) {
// 		const allWorkoutsInCalendar = Object.values(schedules);
// 		const workoutsInTimeFrame = [];
// 		for (const workout of allWorkoutsInCalendar) {
// 			if (
// 				isThisTimeFrame(timeFrame, parse(event.id, DATE_FORMAT, new Date()), {
// 					weekStartsOn: 1,
// 				})
// 			) {
// 				workoutNumber++;
// 				counts[workout.status]++;
// 			}
// 		}
// 		restDays = getDaysInTimeFrame(timeFrame) - workoutsInTimeFrame.length;
// 	}

// 	return {
// 		workoutNumber,
// 		...counts,
// 		restDays,
// 	};
// };