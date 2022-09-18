import { useState } from 'react';
import { format } from 'date-fns';
import { useGetSchedulesQuery, useAddEventToScheduleMutation } from 'features/schedule';

import { Calendar } from '../Calendar/Calendar';
import { EventModal } from '../EventModal/EventModal';
import styles from './ScheduleForm.module.css';

export const ScheduleForm = () => {
	const { data } = useGetSchedulesQuery();
	const [addEvent] = useAddEventToScheduleMutation();
	const [currentDate, setCurrentDate] = useState(new Date());
	const [openModal, setOpenModal] = useState(false);

	const selectedDate = format(currentDate, 'ddLLLyyyy');
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
			<button onClick={() => setOpenModal(true)}>open modal</button>
			<Calendar events={data} value={currentDate} onDateChange={setCurrentDate} />
			{openModal && (
				<EventModal close={setOpenModal} selectedDate={selectedDate} event={data[selectedDate]} />
			)}
		</div>
	);
};
