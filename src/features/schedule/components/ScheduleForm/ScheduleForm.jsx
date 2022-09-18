import { useState } from 'react';
import { format } from 'date-fns';
import { useGetSchedulesQuery, useAddEventToScheduleMutation } from 'features/schedule';

import { Calendar } from '../Calendar/Calendar';
import styles from './ScheduleForm.module.css';

export const ScheduleForm = () => {
	const [currentDate, setCurrentDate] = useState(new Date());
	const { data } = useGetSchedulesQuery();
	const [addEvent] = useAddEventToScheduleMutation();

	const handleClick = async () => {
		try {
			await addEvent({
				id: format(currentDate, 'ddLLLyyyy'),
				name: 'chest',
				status: 'tobeCompleted',
			});
		} catch (error) {
			console.log('add event', error);
		}
	};
	return (
		<div className={styles.scheduleForm}>
			<button onClick={handleClick}>add</button>
			<Calendar event={data} value={currentDate} onDateChange={setCurrentDate} />
		</div>
	);
};
