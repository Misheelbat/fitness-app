import { useState } from 'react';
import Select from 'react-select';
import { toast } from 'react-toastify';

import { Button } from 'components/Elements';
import { useGetWorkoutsQuery, CreateWorkout } from 'features/workout';
import { useAddEventToScheduleMutation, default_status_options } from 'features/schedule';

import styles from './EventDetails.module.css';
import selectorStyles from './select-styles';

export const EventDetails = ({ selectedDate, event = {} }) => {
	const { data: workouts } = useGetWorkoutsQuery();
	const [addEventToCalendar, { isLoading: isAddEventLoading }] = useAddEventToScheduleMutation();

	const [workoutOption, setWorkoutOption] = useState({
		value: event?.name,
		label: event?.name,
	});
	const [statusOption, setStatusOption] = useState({
		label: event.status ? event.status : default_status_options[2].label,
		value: event.status ? event.status : default_status_options[2].value,
	});

	const selectWorkout = async () => {
		try {
			await addEventToCalendar({
				id: selectedDate,
				name: workoutOption.value,
				status: statusOption.value,
			}).unwrap();
			toast.success('Event added to Calendar');
		} catch (error) {
			toast.error(error);
		}
	};

	return (
		<div>
			<div className={styles.eventModalContent}>
				<section>
					<div className={styles.eventSubHeader}>Select a Workout</div>
					<Select
						value={workoutOption}
						options={workouts?.ids.map((id) => ({ value: id, label: id }))}
						onChange={(e) => setWorkoutOption(e)}
						styles={selectorStyles}
						hideSelectedOptions={true}
					/>
				</section>

				<section>
					<div className={styles.eventSubHeader}>Status:</div>
					<Select
						value={statusOption}
						options={default_status_options}
						onChange={(e) => setStatusOption(e)}
						styles={selectorStyles}
						hideSelectedOptions={true}
					/>
					<Button onClick={selectWorkout} buttonType="max-width" isLoading={isAddEventLoading}>
						Select
					</Button>
				</section>

				<span>-- or --</span>

				<CreateWorkout />
			</div>
		</div>
	);
};
