import { useState } from 'react';
import Select from 'react-select';
import { toast } from 'react-toastify';

import { Button } from 'components/Elements';
import { useAddEventToScheduleMutation, default_status_options } from 'features/schedule';
import { useGetWorkoutsQuery } from 'features/workout';
import { CreateWorkout } from 'features/workout/components/Dashboard/CreateWorkout/CreateWorkout';

import styles from './EventDetails.module.css';
import { selectorStyles } from './select-styles';

export const EventDetails = ({ selectedDate, event = {} }) => {
	const { data: workouts } = useGetWorkoutsQuery();
	const [addEventToCalendar, { isLoading: isAddEventLoading }] = useAddEventToScheduleMutation();

	const [workoutOption, setWorkoutOption] = useState({ value: event?.name, label: event?.name });
	const [statusOption, setStatusOption] = useState({
		label: event?.status,
		value: event?.status,
	});

	const selectWorkout = async () => {
		try {
			await addEventToCalendar({
				id: selectedDate,
				name: workoutOption.value,
				status: 'tobeCompleted',
			}).unwrap();
			toast.success('Event added to Calendar');
		} catch (error) {
			toast.error(error);
		}
	};

	return (
		<div>
			<div className={styles.eventModalContent}>
				{event?.status && (
					<>
						<div>status:</div>
						<Select
							value={statusOption}
							options={default_status_options}
							onChange={(e) => setStatusOption(e)}
							styles={selectorStyles}
						/>
					</>
				)}

				<div>Select from your Workouts</div>
				<Select
					value={workoutOption}
					options={workouts?.ids.map((id) => ({ value: id, label: id }))}
					onChange={(e) => setWorkoutOption(e)}
					styles={selectorStyles}
				/>
				<Button onClick={selectWorkout} buttonType="max-width" isLoading={isAddEventLoading}>
					Select
				</Button>

				<span>-- or --</span>

				<CreateWorkout />
			</div>
		</div>
	);
};
