import { useState, useEffect } from 'react';
import { format, isBefore } from 'date-fns';
import { toast } from 'react-toastify';

import {
	useGetSchedulesQuery,
	useDeleteEventMutation,
	useUpdateEventStatusMutation,
} from 'features/schedule';

import { Calendar } from '../Calendar/Calendar';
import { EventDetails } from '../EventDetails/EventDetails';
import styles from './ScheduleForm.module.css';
import { Modal } from 'components/Layout';

export const ScheduleForm = () => {
	const [currentDate, setCurrentDate] = useState(new Date());

	const [deleteEvent] = useDeleteEventMutation();
	const [updateEventStatus] = useUpdateEventStatusMutation();
	const { data: schedules, isSuccess } = useGetSchedulesQuery();

	const selectedDate = format(currentDate, 'dLLLyyyy');
	const canDeleteEvent = schedules?.hasOwnProperty(selectedDate);

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
		if (!schedules[selectedDate]) return;
		try {
			await deleteEvent(selectedDate).unwrap();
			toast.success('Event Deleted');
		} catch (error) {
			toast.error(error);
		}
	};

	return (
		<div className={styles.scheduleForm}>
			<div className={styles.scheduleFormControls}>
				<Modal aria-label="calendar day details">
					{schedules && (
						<EventDetails selectedDate={selectedDate} event={schedules[selectedDate]} />
					)}
				</Modal>
				<button disabled={!canDeleteEvent} onClick={handleDeleteEvent}>
					Delete
				</button>
				<div className={styles.legend}>
					<span className={styles.complete}>Completed</span>
					<span className={styles.notComplete}>Not Completed</span>
					<span className={styles.tobeComplete}>To be Completed</span>
				</div>
			</div>

			<Calendar events={schedules} value={currentDate} onDateChange={setCurrentDate} />
		</div>
	);
};
