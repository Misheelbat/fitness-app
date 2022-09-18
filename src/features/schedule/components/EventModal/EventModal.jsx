import { useState, useRef } from 'react';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { XCircle } from 'phosphor-react';

import { useAddEventToScheduleMutation } from 'features/schedule';
import { useGetWorkoutsQuery, useCreateWorkoutMutation } from 'features/workout';
import { Button } from 'components/Elements';
import styles from './EventModal.module.css';
import { selectorStyles } from './select-styles';

export const EventModal = ({ close, selectedDate, event = {} }) => {
	const newWorkoutTitleRef = useRef();
	const { data, isSuccess } = useGetWorkoutsQuery();
	const [createWorkout, { isLoading }] = useCreateWorkoutMutation();
	const [addEventToCalendar, { isLoading: isAddEventLoading }] = useAddEventToScheduleMutation();
	const [defaultOption, setDefaultOption] = useState({ value: event?.name, label: event?.name });

	let content = [];
	if (isSuccess) {
		const options = data.ids.map((id) => ({ value: id, label: id }));
		content = options;
	}
	const closeModal = () => close(false);

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
				name: defaultOption.value,
				status: 'tobeCompleted',
			}).unwrap();
			toast.success('Event added to Calendar');
			closeModal();
		} catch (error) {
			toast.error(error.message);
		}
	};
	return (
		<div className={styles.eventModalContainer}>
			<div className={styles.eventModal}>
				<div className={styles.eventModalHeader}>
					<p>{selectedDate}</p>
					<button onClick={closeModal} className={styles.closeBtn}>
						<XCircle size={20} />
					</button>
				</div>

				<div className={styles.eventModalContent}>
					<div>Select from your Workouts</div>
					<Select
						value={defaultOption}
						options={content}
						onChange={(e) => setDefaultOption(e)}
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
