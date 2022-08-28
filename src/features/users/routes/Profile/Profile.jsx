import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Pen } from 'phosphor-react';

import { selectDisplayName, selectEmail } from 'features/auth';
import { ContentLayout } from 'components/Layout';

import styles from './Profile.module.css';

const Entry = ({ label, value }) => {
	return (
		<div className={styles.entry}>
			<dt>{label}</dt>
			<dd>{value}</dd>
		</div>
	);
};

export const Profile = () => {
	const displayName = useSelector(selectDisplayName);
	const email = useSelector(selectEmail);

	return (
		<ContentLayout title="Profile">
			<div className={styles.profile}>
				<h3>Personal information</h3>
				<div>
					<dl>
						<Entry label="Username" value={displayName} />
						<Entry label="Email Adress" value={email} />
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
