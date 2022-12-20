import { useState, useEffect } from 'react';
import { format, isBefore, parse } from 'date-fns';
import { toast } from 'react-toastify';

import {
	EVENT_STATUS,
	useGetSchedulesQuery,
	useDeleteEventMutation,
	useUpdateEventStatusMutation,
} from 'features/schedule';

import { Button } from 'components/Elements';
import { Modal } from 'components/Modal/Modal';
import { Calendar } from '../Calendar/Calendar';
import { CalendarEventDetails } from '../CalendarEvent/CalendarEvent';

import { DATE_FORMAT } from 'assets/date_format';
import styles from './ScheduleForm.module.css';

export const ScheduleForm = () => {
	const [currentDate, setCurrentDate] = useState(new Date());
	const { data: schedules, isSuccess } = useGetSchedulesQuery();

	const [deleteEvent, { isLoading: isDeleteLoading }] =
		useDeleteEventMutation();
	const [updateEventStatus] = useUpdateEventStatusMutation();

	const selectedDate = format(currentDate, DATE_FORMAT);
	const canDeleteEvent = schedules?.hasOwnProperty(selectedDate);

	useEffect(() => {
		// if a past event has toBeCompleted status change it to not completed
		if (isSuccess && schedules) {
			const today = format(new Date(), DATE_FORMAT);
			Object.values(schedules).forEach(async (event) => {
				if (event.status !== EVENT_STATUS.tobeCompleted) return;
				if (
					isBefore(
						parse(event.id, DATE_FORMAT, new Date()),
						parse(today, DATE_FORMAT, new Date())
					)
				) {
					try {
						await updateEventStatus({
							id: event.id,
							status: EVENT_STATUS.inComplete,
						}).unwrap();
					} catch (error) {
						toast.error(error);
					}
				}
			});
		}
	}, [isSuccess, schedules, updateEventStatus]);

	const handleDeleteEvent = async () => {
		if (!canDeleteEvent) return;
		try {
			await deleteEvent(selectedDate).unwrap();
			toast.success('Event Deleted', { toastId: selectedDate });
		} catch (error) {
			toast.error(error);
		}
	};

	return (
		<div className={styles.scheduleForm}>
			<div className={styles.scheduleFormControls}>
				<Modal>
					<Modal.Title buttonType="add" />
					<Modal.Content contentLabel="calendar day details">
						{schedules && (
							<CalendarEventDetails
								selectedDate={selectedDate}
								event={schedules[selectedDate]}
							/>
						)}
					</Modal.Content>
				</Modal>

				<Button
					aria-disabled={!canDeleteEvent}
					isLoading={isDeleteLoading}
					onClick={handleDeleteEvent}
				>
					Delete
				</Button>

				<div className={styles.statusLegend}>
					<span className={styles.complete}>Completed</span>
					<span className={styles.notComplete}>Not Completed</span>
					<span className={styles.tobeComplete}>To be Completed</span>
				</div>
			</div>

			<Calendar
				events={schedules}
				value={currentDate}
				onDateChange={setCurrentDate}
			/>
		</div>
	);
};
