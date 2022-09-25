import Select from 'react-select';
import { toast } from 'react-toastify';
import { useState, useRef } from 'react';
import { XCircle } from 'phosphor-react';

import { Button } from 'components/Elements';
import { useAddEventToScheduleMutation, default_status_options } from 'features/schedule';
import { useGetWorkoutsQuery, useCreateWorkoutMutation } from 'features/workout';

import styles from './EventModal.module.css';
import { selectorStyles } from './select-styles';

export const EventModal = ({ close, selectedDate, event = {} }) => {
	const newWorkoutTitleRef = useRef();
	const { data: workouts } = useGetWorkoutsQuery();
	const [createWorkout, { isLoading }] = useCreateWorkoutMutation();
	const [addEventToCalendar, { isLoading: isAddEventLoading }] = useAddEventToScheduleMutation();

	const [workoutOption, setWorkoutOption] = useState({ value: event?.name, label: event?.name });
	const [statusOption, setStatusOption] = useState({
		label: event?.status,
		value: event?.status,
	});

	const createNewWorkout = async (e) => {
		e.preventDefault();
		try {
			await createWorkout(newWorkoutTitleRef.current.value).unwrap();
			toast.success('Created new Workout');
		} catch (err) {
			toast.error(err.message);
		}
	};

	const selectWorkout = async () => {
		try {
			await addEventToCalendar({
				id: selectedDate,
				name: workoutOption.value,
				status: 'tobeCompleted',
			}).unwrap();
			toast.success('Event added to Calendar');
			close(false);
		} catch (error) {
			toast.error(error);
		}
	};

	return (
		<div className={styles.eventModalContainer}>
			<div className={styles.eventModal}>
				<div className={styles.eventModalHeader}>
					<p>{selectedDate}</p>
					<button onClick={() => close(false)} className={styles.closeBtn}>
						<XCircle size={20} />
					</button>
				</div>

				{event?.status && (
					<div>
						status:
						<Select
							value={statusOption}
							options={default_status_options}
							onChange={(e) => setStatusOption(e)}
							styles={selectorStyles}
						/>
					</div>
				)}

				<div className={styles.eventModalContent}>
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

					<form onSubmit={createNewWorkout}>
						<input ref={newWorkoutTitleRef} type="text" placeholder="Create a new Workout" />
						<Button isLoading={isLoading} buttonType="max-width">
							Create
						</Button>
					</form>
				</div>
			</div>
		</div>
	);
};
