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

const getDaysInTimeFrame = (timeFrame) => {
	const daysInTimeFrame = {
		[DEFAULT_TIMEFRAMES.week]: 7,
		[DEFAULT_TIMEFRAMES.month]: getDaysInMonth(new Date()),
		[DEFAULT_TIMEFRAMES.year]: getDaysInYear(new Date()),
	};
	return daysInTimeFrame[timeFrame];
};

const isThisTimeFrame = (timeFrame, datesToCompare) => {
	const timeFrameFunc = {
		[DEFAULT_TIMEFRAMES.week]: isThisWeek,
		[DEFAULT_TIMEFRAMES.month]: isThisMonth,
		[DEFAULT_TIMEFRAMES.year]: isThisYear,
	};
	return timeFrameFunc[timeFrame](datesToCompare, {
		weekStartsOn: 1,
	});
};

export const useGetWorkoutStats = (timeFrame = DEFAULT_TIMEFRAMES.week) => {
	const { data: schedules, isSuccess } = useGetSchedulesQuery();

	const counts = {
		[EVENT_STATUS.complete]: 0,
		[EVENT_STATUS.inComplete]: 0,
		[EVENT_STATUS.tobeCompleted]: 0,
	};
	let workoutNumber = 0;
	let restDays = 7;

	if (isSuccess && schedules) {
		const allWorkoutsInCalendar = Object.values(schedules);
		for (const workout of allWorkoutsInCalendar) {
			if (
				isThisTimeFrame(timeFrame, parse(workout.id, DATE_FORMAT, new Date()))
			) {
				workoutNumber++;
				counts[workout.status]++;
			}
		}
		restDays = getDaysInTimeFrame(timeFrame) - workoutNumber;
	}

	return {
		workoutNumber,
		...counts,
		restDays,
	};
};
