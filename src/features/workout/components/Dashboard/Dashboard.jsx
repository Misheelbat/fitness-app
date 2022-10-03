import { useGetWorkoutsQuery } from 'features/workout/store';

import { Card } from '../Card/Card';
import { Modal } from 'components/Layout';
import { PageSpinner } from 'components/Elements';
import { CreateWorkout } from '../CreateWorkout/CreateWorkout';

import styles from './Dashboard.module.css';
const loadingStyle = { height: '100%', width: '100%' };

export const Dashboard = () => {
	const { data: workouts, isLoading, isSuccess, isError, error } = useGetWorkoutsQuery();

	let content;
	if (isLoading) {
		content = <PageSpinner variant="secondary" styles={loadingStyle} />;
	}

	if (isError) {
		content = <p>{error}</p>;
	}

	if (isSuccess) {
		const { ids } = workouts;
		content = ids.length ? (
			ids.map((workoutId) => <Card key={workoutId} cardName={workoutId} />)
		) : (
			<div>Nothing here yet...</div>
		);
	}

	return (
		<div className={styles.dashboard}>
			<div className={styles.overview}>
				<h4>Overview :</h4>
				<p>
					Find the best workout for your goal, experience, desired training style and equipment
					access.
				</p>

				<Modal>
					<Modal.Title>Create new Workout</Modal.Title>
					<Modal.Content contentLabel="create a new workout">
						<CreateWorkout />
					</Modal.Content>
				</Modal>
			</div>

			<div className={styles.workoutsContainer}>
				<h4>My Workouts :</h4>
				<div className={styles.workouts}>{content}</div>
			</div>
		</div>
	);
};
