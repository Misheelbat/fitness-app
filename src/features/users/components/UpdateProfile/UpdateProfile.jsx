import { useSelector } from 'react-redux';

import { selectDisplayName, selectEmail } from 'features/auth';

import { ContentLayout } from 'components/Layout';
import { UpdateDisplayName } from '../DisplayName/UpdateDisplayName';
import { UpdateEmail } from '../Email/UpdateEmail';
import { UpdatePassword } from '../Password/UpdatePassword';

import styles from './UpdateProfile.module.css';

export const UpdateProfile = () => {
	const displayName = useSelector(selectDisplayName);
	const email = useSelector(selectEmail);

	return (
		<ContentLayout title="Update Profile" link="../">
			<div className={styles.updateProfile}>
				<h3>Account Settings</h3>
				<UpdateDisplayName placeHolder={displayName} />
				<UpdateEmail placeHolder={email} />
				<br />
				<UpdatePassword />
			</div>
		</ContentLayout>
	);
};
