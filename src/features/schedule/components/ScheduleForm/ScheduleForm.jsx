import { Calendar } from '../Calendar/Calendar';
import styles from './ScheduleForm.module.css';
const dummyEvents = { '14Sep2022': { name: 'Core', status: 'tobeCompleted' } };

export const ScheduleForm = () => {
	return (
		<div className={styles.scheduleForm}>
			<Calendar event={dummyEvents} />
		</div>
	);
};
