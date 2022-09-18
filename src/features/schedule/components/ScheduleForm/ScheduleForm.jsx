import { useState } from 'react';
import { format } from 'date-fns';
import { useGetSchedulesQuery } from 'features/schedule';

import { Calendar } from '../Calendar/Calendar';
import { EventModal } from '../EventModal/EventModal';
import styles from './ScheduleForm.module.css';

export const ScheduleForm = () => {
	const [openModal, setOpenModal] = useState(false);
	const [currentDate, setCurrentDate] = useState(new Date());
	const { data: schedules } = useGetSchedulesQuery();

	const selectedDate = format(currentDate, 'dLLLyyyy');

	return (
		<div className={styles.scheduleForm}>
			<button onClick={() => setOpenModal(true)}>open modal</button>
			<Calendar events={schedules} value={currentDate} onDateChange={setCurrentDate} />
			{openModal && (
				<EventModal
					close={setOpenModal}
					selectedDate={selectedDate}
					event={schedules[selectedDate]}
				/>
			)}
		</div>
	);
};
