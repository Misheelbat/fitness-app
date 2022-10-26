import { useState, useEffect } from 'react';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { format, parse, isBefore } from 'date-fns';

import { useGetWorkoutsQuery, CreateWorkout } from 'features/workout';
import { EVENT_STATUS, useAddEventToScheduleMutation } from 'features/schedule';

import { Button } from 'components/Elements';
import { DATE_FORMAT } from 'assets/date_format';

import styles from './CalendarEvent.module.css';
import selectorStyles from './select-styles';

export const CalendarEventDetails = ({ selectedDate, event = {} }) => {
	const { data: workouts } = useGetWorkoutsQuery();
	const [addEventToCalendar, { isLoading: isAddEventLoading }] =
		useAddEventToScheduleMutation();

	const [selectedWorkout, setSelectedWorkout] = useState(event.name ?? null);
	const [selectedStatus, setSelectedStatus] = useState(
		event.status ?? EVENT_STATUS.tobeCompleted
	);
	const [statusOptions, setStatusOptions] = useState(
		Object.values(EVENT_STATUS)
	);

	const canSave = selectedDate && selectedWorkout && selectedStatus;

	useEffect(() => {
		// if selected date is in the past
		if (isBefore(parse(selectedDate, DATE_FORMAT, new Date()), new Date())) {
			if (!event.status) setSelectedStatus(null);
			// remove tobeCompleted option from available status options
			setStatusOptions([EVENT_STATUS.complete, EVENT_STATUS.inComplete]);
		}
	}, [selectedDate, event.status]);

	const selectWorkout = async (e) => {
		e.preventDefault();
		if (!canSave) return;
		try {
			await addEventToCalendar({
				id: selectedDate,
				name: selectedWorkout,
				status: selectedStatus,
			}).unwrap();
			toast.success('Event added to Calendar', { toastId: selectedDate });
		} catch (error) {
			toast.error(error);
		}
	};

	const default_workout_option = selectedWorkout
		? {
				value: selectedWorkout,
				label: selectedWorkout,
		  }
		: null;
	const default_status_option = selectedStatus
		? {
				value: selectedStatus,
				label: selectedStatus,
		  }
		: null;

	return (
		<div className={styles.eventModalContent}>
			<form onSubmit={selectWorkout}>
				<section>
					<div className={styles.eventSubHeader}>
						Select a Workout for:
						<span>
							{format(
								parse(selectedDate, DATE_FORMAT, new Date()),
								"ccc ',' dd LLL yyyy"
							)}
						</span>
					</div>
					<Select
						value={default_workout_option}
						options={workouts?.ids.map((id) => ({ value: id, label: id }))}
						onChange={(e) => setSelectedWorkout(e.value)}
						styles={selectorStyles}
						noOptionsMessage={() => 'No Workouts Found'}
						placeholder={'Select a Workout...'}
					/>
				</section>

				<section>
					<div className={styles.eventSubHeader}>Set Workout Status:</div>
					<Select
						value={default_status_option}
						options={statusOptions.map((value) => ({
							label: value,
							value,
						}))}
						onChange={(e) => setSelectedStatus(e.value)}
						styles={selectorStyles}
						hideSelectedOptions={true}
						placeholder={'Select a Workout Status...'}
					/>

					<Button
						aria-disabled={!canSave}
						type="submit"
						buttonType="max-width"
						isLoading={isAddEventLoading}
					>
						Select
					</Button>
				</section>
			</form>

			<span>-- or --</span>

			<CreateWorkout />
		</div>
	);
};
