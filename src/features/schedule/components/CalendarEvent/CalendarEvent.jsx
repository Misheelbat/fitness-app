import { useState } from 'react';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { format } from 'date-fns';

import { Button } from 'components/Elements';
import { useGetWorkoutsQuery, CreateWorkout } from 'features/workout';
import { useAddEventToScheduleMutation, DEFAULT_EVENT_STATUS_OPTIONS } from 'features/schedule';

import styles from './CalendarEvent.module.css';
import selectorStyles from './select-styles';

export const CalendarEvent = ({ selectedDate, event = {} }) => {
	const { data: workouts } = useGetWorkoutsQuery();
	const [addEventToCalendar, { isLoading: isAddEventLoading }] = useAddEventToScheduleMutation();

	const [workoutOption, setWorkoutOption] = useState({
		value: event?.name,
		label: event?.name,
	});

	const [statusOption, setStatusOption] = useState({
		label: event.status ? event.status : DEFAULT_EVENT_STATUS_OPTIONS.tobeCompleted.label,
		value: event.status ? event.status : DEFAULT_EVENT_STATUS_OPTIONS.tobeCompleted.value,
	});

	const canSave = [selectedDate, workoutOption.value, statusOption.value].every(Boolean);

	const selectWorkout = async (e) => {
		e.preventDefault();
		if (!canSave) return;
		try {
			await addEventToCalendar({
				id: selectedDate,
				name: workoutOption.value,
				status: statusOption.value,
			}).unwrap();
			toast.success('Event added to Calendar', { toastId: selectedDate });
		} catch (error) {
			toast.error(error);
		}
	};

	return (
		<div className={styles.eventModalContent}>
			<form onSubmit={selectWorkout}>
				<section>
					<div className={styles.eventSubHeader}>
						Select a Workout for:{' '}
						<span>{format(new Date(selectedDate), "ccc ',' dd LLL yyyy")}</span>
					</div>
					<Select
						value={workoutOption.value ? workoutOption : null}
						options={workouts?.ids.map((id) => ({ value: id, label: id }))}
						onChange={(e) => setWorkoutOption(e)}
						styles={selectorStyles}
						hideSelectedOptions={true}
						noOptionsMessage={() => 'No Workouts Found'}
						placeholder={'Select a Workout...'}
					/>
				</section>

				<section>
					<div className={styles.eventSubHeader}>Set Workout Status:</div>
					<Select
						value={statusOption}
						options={Object.values(DEFAULT_EVENT_STATUS_OPTIONS)}
						onChange={(e) => setStatusOption(e)}
						styles={selectorStyles}
						hideSelectedOptions={true}
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
