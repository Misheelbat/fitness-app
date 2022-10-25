import { useState, useEffect } from 'react';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { format, parse, isBefore } from 'date-fns';

import { useGetWorkoutsQuery, CreateWorkout } from 'features/workout';
import {
	useAddEventToScheduleMutation,
	DEFAULT_EVENT_STATUS_OPTIONS,
} from 'features/schedule';

import { Button } from 'components/Elements';
import { DATE_FORMAT } from 'assets/date_format';

import styles from './CalendarEvent.module.css';
import selectorStyles from './select-styles';

export const CalendarEventDetails = ({ selectedDate, event = {} }) => {
	const { data: workouts } = useGetWorkoutsQuery();
	const [addEventToCalendar, { isLoading: isAddEventLoading }] =
		useAddEventToScheduleMutation();

	const [workoutOption, setWorkoutOption] = useState({
		value: event?.name,
		label: event?.name,
	});

	const [statusOption, setStatusOption] = useState({
		label: event.status
			? event.status
			: DEFAULT_EVENT_STATUS_OPTIONS.tobeCompleted.label,
		value: event.status
			? event.status
			: DEFAULT_EVENT_STATUS_OPTIONS.tobeCompleted.value,
	});

	const [statusOptions, setStatusOptions] = useState(
		Object.values(DEFAULT_EVENT_STATUS_OPTIONS)
	);

	const canSave = [
		selectedDate,
		workoutOption.value,
		statusOption?.value,
	].every(Boolean);

	useEffect(() => {
		if (isBefore(parse(selectedDate, DATE_FORMAT, new Date()), new Date())) {
			if (!event.status) setStatusOption(null);

			const options = Object.values(DEFAULT_EVENT_STATUS_OPTIONS).filter(
				(status) =>
					status.value !== DEFAULT_EVENT_STATUS_OPTIONS.tobeCompleted.value
			);
			setStatusOptions(options);
		}
		// eslint-disable-next-line
	}, [selectedDate]);

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
						Select a Workout for:
						<span>
							{format(
								parse(selectedDate, DATE_FORMAT, new Date()),
								"ccc ',' dd LLL yyyy"
							)}
						</span>
					</div>
					<Select
						value={workoutOption.value ? workoutOption : null}
						options={workouts?.ids.map((id) => ({ value: id, label: id }))}
						onChange={(e) => setWorkoutOption(e)}
						styles={selectorStyles}
						noOptionsMessage={() => 'No Workouts Found'}
						placeholder={'Select a Workout...'}
					/>
				</section>

				<section>
					<div className={styles.eventSubHeader}>Set Workout Status:</div>
					<Select
						value={statusOption}
						options={statusOptions}
						onChange={(e) => setStatusOption(e)}
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
