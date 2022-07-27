import { Link } from 'react-router-dom';

import { TemplateCard } from '../TemplateCard/TemplateCard';
import styles from './Dashboard.module.css';

export const Dashboard = () => {
	return (
		<div className={styles.dashboard}>
			<div className={styles.overview}>
				<h4>Overview :</h4>
				<p>
					Find the best workout for your goal, experience, desired training
					style and equipment access.
				</p>
				<div className={styles.createTemplateBtn}>
					<Link to="createTemplate">Create workout Template</Link>
				</div>
			</div>
			<div>
				<div className={styles.workoutsTitle}>
					<h4>My Workouts :</h4>
					<div className={styles.createTemplateBtn}>
						<Link to="prog">See All</Link>
					</div>
				</div>
				<div className={styles.workouts}>
					<TemplateCard />
				</div>
			</div>
		</div>
	);
};
