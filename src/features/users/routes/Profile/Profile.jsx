import { Link } from 'react-router-dom';

import { Pen } from 'phosphor-react';
import { useAuth } from 'features/auth';
import { ContentLayout } from 'components/Layout';

import styles from './Profile.module.css';

const Entry = ({ label, value }) => {
	return (
		<div div className={styles.entry}>
			<dt>{label}</dt>
			<dd>{value}</dd>
		</div>
	);
};

export const Profile = () => {
	const { currentUser } = useAuth();
	return (
		<ContentLayout title="Profile">
			<div className={styles.profile}>
				<h3>Personal information</h3>
				<div>
					<dl>
						<Entry label="Username" value={currentUser.displayName} />
						<Entry label="Email Adress" value={currentUser.email} />
					</dl>
					<Link to="./update" className={styles.updateProfile}>
						<Pen />
						<span>Update Profile</span>
					</Link>
				</div>
			</div>
		</ContentLayout>
	);
};
