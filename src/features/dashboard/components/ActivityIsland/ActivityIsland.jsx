import { format, compareDesc } from 'date-fns';
import { useGetSchedulesQuery } from 'features/schedule';
import { nearestFutureEventDateFn } from 'features/dashboard/utility';

import { Island } from '../Island/Island';

import { DATE_FORMAT } from 'assets/date_format';
import styles from './ActivityIsland.module.css';

export const ActivityIsland = () => {
	const { data: schedules, isSuccess } = useGetSchedulesQuery();
	const today = format(new Date(), DATE_FORMAT);

	let title, nextWorkoutDate;
	if (isSuccess) {
		title = schedules[today] ? schedules[today].name : 'Rest Day';
		// array of schedule objects sorted by date
		const sortedSchedulesArray = Object.values(schedules).sort((a, b) =>
			compareDesc(new Date(b.id), new Date(a.id))
		);
		const nextScheduleObject = nearestFutureEventDateFn(sortedSchedulesArray);
		nextWorkoutDate = format(new Date(nextScheduleObject.id), "ccc ',' d LLL yyyy");
	}

	return (
		<Island>
			<Island.Title>Todays Activity</Island.Title>
			<Island.Content>{title}</Island.Content>
			<Island.Footer>
				<span className={styles.nextWorkout}>Next Workout:</span>
				<span>{nextWorkoutDate}</span>
			</Island.Footer>
		</Island>
	);
};
