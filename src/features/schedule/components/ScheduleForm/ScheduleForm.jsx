import { useState, useEffect } from 'react';
import { format, isBefore } from 'date-fns';
import { useGetSchedulesQuery, useUpdateEventStatusMutation } from 'features/schedule';

import { Calendar } from '../Calendar/Calendar';
import { EventModal } from '../EventModal/EventModal';
import styles from './ScheduleForm.module.css';

export const ScheduleForm = () => {
	const [openModal, setOpenModal] = useState(false);
	const [currentDate, setCurrentDate] = useState(new Date());
	const { data: schedules, isSuccess } = useGetSchedulesQuery();
	const [updateEventStatus] = useUpdateEventStatusMutation();

	const selectedDate = format(currentDate, 'dLLLyyyy');
	useEffect(() => {
		if (isSuccess && schedules) {
			const today = new Date();
			Object.values(schedules).forEach(async (event) => {
				if (event.status !== 'tobeCompleted') return;
				if (isBefore(new Date(event.id), today)) {
					await updateEventStatus({ id: event.id, status: 'incomplete' });
				}
			});
		}
	}, [isSuccess, schedules, updateEventStatus]);

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
