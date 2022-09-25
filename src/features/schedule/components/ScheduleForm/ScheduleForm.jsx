import { useState, useEffect } from 'react';
import { format, isBefore } from 'date-fns';
import { toast } from 'react-toastify';

import {
	useGetSchedulesQuery,
	useDeleteEventMutation,
	useUpdateEventStatusMutation,
} from 'features/schedule';

import { Calendar } from '../Calendar/Calendar';
import { EventModal } from '../EventModal/EventModal';
import styles from './ScheduleForm.module.css';

export const ScheduleForm = () => {
	const [deleteEvent] = useDeleteEventMutation();
	const [openModal, setOpenModal] = useState(false);
	const [currentDate, setCurrentDate] = useState(new Date());
	const [updateEventStatus] = useUpdateEventStatusMutation();
	const { data: schedules, isSuccess } = useGetSchedulesQuery();

	const selectedDate = format(currentDate, 'dLLLyyyy');

	useEffect(() => {
		if (isSuccess && schedules) {
			const today = new Date();
			Object.values(schedules).forEach(async (event) => {
				if (event.status !== 'tobeCompleted') return;
				if (isBefore(new Date(event.id), today)) {
					try {
						await updateEventStatus({ id: event.id, status: 'incomplete' });
					} catch (error) {
						toast.error(error);
					}
				}
			});
		}
	}, [isSuccess, schedules, updateEventStatus]);

	const handleDeleteEvent = async () => {
		try {
			await deleteEvent(selectedDate).unwrap();
			toast.success('Event Deleted');
		} catch (error) {
			toast.error(error);
		}
	};

	return (
		<div className={styles.scheduleForm}>
			<button onClick={() => setOpenModal(true)}>open modal</button>
			<button onClick={handleDeleteEvent}>Delete</button>
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
