import { format, compareDesc } from 'date-fns';
import { useGetSchedulesQuery } from 'features/schedule';
import { DATE_FORMAT } from 'assets/date_format';

import { Island } from '../Island/Island';

import styles from './ActivityIsland.module.css';

export const ActivityIsland = () => {
	const { data: schedules, isSuccess } = useGetSchedulesQuery();
	const today = format(new Date(), DATE_FORMAT);

	let title;
	let nextWorkoutDay;
	if (isSuccess) {
		title = schedules[today] ? schedules[today].name : 'Rest Day';
		// array of schedule objects sorted by date
		const schedulesArray = Object.values(schedules).sort((a, b) =>
			compareDesc(new Date(b.id), new Date(a.id))
		);
		nextWorkoutDay = nearestFutureDate(schedulesArray);
	}
	return (
		<Island>
			<Island.Title>Todays Activity</Island.Title>
			<Island.Content>{title}</Island.Content>
			<Island.Footer>
				<span className={styles.nextWorkout}>Next Workout:</span>
				<span>{nextWorkoutDay?.id}</span>
			</Island.Footer>
		</Island>
	);
};

const nearestFutureDate = (dateArr) => {
	const today = new Date();
	const futArr = dateArr.filter((n) => new Date(n.id) >= today);
	return futArr.length > 0 ? futArr[0] : null;
};
