import { Link } from 'react-router-dom';

import { useGetWorkoutsQuery } from 'features/workout/store';
import { Template } from '../Template/Template';
import { PageSpinner } from 'components/Elements';
import styles from './Dashboard.module.css';

export const Dashboard = () => {
	const { data, isLoading } = useGetWorkoutsQuery();

	let content;

	if (isLoading) {
		content = (
			<PageSpinner
				variant="secondary"
				styles={{ height: '100%', width: '100%' }}
			/>
		);
	} else if (Object.entries(data).length === 0) {
		content = <div>Nothing here yet...</div>;
	} else {
		content = data.ids.map((workout) => (
			<Template key={workout} title={workout} />
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
				<div className={styles.createTemplateBtn}>
					<Link to="createTemplate">Create Template</Link>
				</div>
			</div>

			<div>
				<div className={styles.workoutsTitle}>
					<h4>My Workouts :</h4>
					<div className={styles.createTemplateBtn}>
						<Link to="prog">See All</Link>
					</div>
				</div>
				<div className={styles.workouts}>{content}</div>
			</div>
		</div>
	);
};