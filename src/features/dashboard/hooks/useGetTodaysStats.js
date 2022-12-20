import { format, closestTo, parse } from 'date-fns';

import { useGetSchedulesQuery } from 'features/schedule';
import { DATE_FORMAT } from 'assets/date_format';

export const useGetTodaysStats = () => {
	const { data: schedules, isSuccess } = useGetSchedulesQuery();
	const today = format(new Date(), DATE_FORMAT);

	let todaysActivity = 'Rest Day';
	let nextWorkoutDate = 'Nothing Found';
	if (!isSuccess || !schedules) return { todaysActivity, nextWorkoutDate };

	if (isSuccess && Object.keys(schedules).length !== 0) {
		if (schedules[today]) todaysActivity = schedules[today].name;
		// create array of date Object from schedules with only future dates
		const schedulesArray = Object.values(schedules)
			.map((event) => parse(event.id, DATE_FORMAT, new Date()))
			.filter((datum) => datum > new Date());
		const closestDate = closestTo(new Date(), schedulesArray);
		if (closestDate) {
			nextWorkoutDate = format(closestDate, "ccc ',' d LLL yyyy");
		}
	}

	return { todaysActivity, nextWorkoutDate };
};
