import { useState } from 'react';

import { useGetWorkoutsQuery } from 'features/workout/store';
import { PageSpinner, Button } from 'components/Elements';
import { WorkoutCard } from '../WorkoutCard/WorkoutCard';
import { CreateFormModal } from './CreateFormModal/CreateFormModal';

import styles from './Dashboard.module.css';
const loadingStyle = { height: '100%', width: '100%' };

export const Dashboard = () => {
	const { data, isLoading } = useGetWorkoutsQuery();
	const [open, setOpen] = useState(false);

	let content;

	if (isLoading) {
		content = <PageSpinner variant="secondary" styles={loadingStyle} />;
	} else if (Object.entries(data).length === 0) {
		content = <div>Nothing here yet...</div>;
	} else {
		content = data.ids.map((workout) => (
			<WorkoutCard key={workout} title={workout} />
		));
	}

	return (
		<div className={styles.dashboard}>
			<div className={styles.overview}>
				<h4>Overview :</h4>
				<p>
					Find the best workout for your goal, experience, desired training
					style and equipment access.
				</p>
				<div>
					<Button onClick={() => setOpen(!open)}>Create Workout</Button>
				</div>
			</div>
			{open && <CreateFormModal close={setOpen} />}
			<div className={styles.workoutsContainer}>
				<h4>My Workouts :</h4>
				{/* <div className={styles.workoutsTitle}>
					<div className={styles.createTemplateBtn}>
						<Link to="prog">See All</Link>
					</div>
				</div> */}
				<div className={styles.workouts}>{content}</div>
			</div>
		</div>
	);
};
