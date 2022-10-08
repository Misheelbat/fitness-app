import { format, closestTo } from 'date-fns';
import { useGetSchedulesQuery } from 'features/schedule';

import { Island } from '../Island/Island';

import { DATE_FORMAT } from 'assets/date_format';
import styles from './ActivityIsland.module.css';

export const ActivityIsland = () => {
	const { data: schedules, isSuccess } = useGetSchedulesQuery();
	const today = format(new Date(), DATE_FORMAT);

	let title, nextWorkoutDate;
	if (isSuccess) {
		title = schedules[today] ? schedules[today].name : 'Rest Day';
		// array of date Object from schedules
		const schedulesArray = Object.values(schedules).map((n) => new Date(n.id));
		const closestDate = closestTo(new Date(), schedulesArray);
		nextWorkoutDate = format(closestDate, "ccc ',' d LLL yyyy");
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
