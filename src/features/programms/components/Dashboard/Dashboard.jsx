import { Link } from 'react-router-dom';

import { TemplateCard } from '../TemplateCard/TemplateCard';
import styles from './Dashboard.module.css';

export const Dashboard = () => {
	return (
		<div className={styles.dashboard}>
			<div>
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
				<h4>My Workouts :</h4>
				<TemplateCard />
			</div>
		</div>
	);
};
