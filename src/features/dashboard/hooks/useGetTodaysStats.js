import { format, closestTo } from 'date-fns';

import { useGetSchedulesQuery } from 'features/schedule';
import { DATE_FORMAT } from 'assets/date_format';

export const useGetTodaysStats = () => {
	const { data: schedules, isSuccess } = useGetSchedulesQuery();
	const today = format(new Date(), DATE_FORMAT);

	let todaysActivity = 'Rest Day';
	let nextWorkoutDate = 'No Workout found in Calendar';
	if (!isSuccess || !schedules) return { todaysActivity, nextWorkoutDate };

	if (isSuccess) {
		if (schedules[today]) todaysActivity = schedules[today].name;
		// array of date Object from schedules
		const schedulesArray = Object.values(schedules).map((n) => new Date(n.id));
		const closestDate = closestTo(new Date(), schedulesArray);
		nextWorkoutDate = format(closestDate, "ccc ',' d LLL yyyy");
	}

	return { todaysActivity, nextWorkoutDate };
};
