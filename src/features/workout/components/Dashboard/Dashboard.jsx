import { useState } from 'react';

import { useGetWorkoutsQuery } from 'features/workout/store';
import { PageSpinner, Button } from 'components/Elements';
import { Card } from '../Card/Card';
import { CreateWorkout } from './CreateWorkout/CreateWorkout';

import styles from './Dashboard.module.css';
const loadingStyle = { height: '100%', width: '100%' };

export const Dashboard = () => {
	const [open, setOpen] = useState(false);
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
		content = ids.length ? ids.map((workoutId) => <Card key={workoutId} title={workoutId} />) : <div>Nothing here yet...</div>;
	}

	return (
		<div className={styles.dashboard}>
			<div className={styles.overview}>
				<h4>Overview :</h4>
				<p>Find the best workout for your goal, experience, desired training style and equipment access.</p>
				<div>
					<Button onClick={() => setOpen(!open)}>Create Workout</Button>
				</div>
			</div>
			{open && <CreateWorkout close={setOpen} />}
			<div className={styles.workoutsContainer}>
				<h4>My Workouts :</h4>
				<div className={styles.workouts}>{content}</div>
			</div>
		</div>
	);
};
