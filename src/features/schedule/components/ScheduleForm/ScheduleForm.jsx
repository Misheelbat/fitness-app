import { useGetSchedulesQuery, useAddEventToScheduleMutation } from 'features/schedule';

import { Calendar } from '../Calendar/Calendar';
import styles from './ScheduleForm.module.css';

export const ScheduleForm = () => {
	const { data } = useGetSchedulesQuery();
	const [addEvent] = useAddEventToScheduleMutation();

	const handleClick = async () => {
		try {
			await addEvent({ id: '20Sep2022', name: 'Leg', status: 'tobeCompleted' });
		} catch (error) {
			console.log('add event', error);
		}
	};
	return (
		<div className={styles.scheduleForm}>
			<button onClick={handleClick}>add</button>
			{data && <Calendar event={data} />}
		</div>
	);
};
