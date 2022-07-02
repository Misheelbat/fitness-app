import { Link } from 'react-router-dom';

import { useAuth } from 'features/auth';

import { ContentLayout } from 'components/Layout';
import { UpdateDisplayName } from '../DisplayName/UpdateDisplayName';
import { UpdateEmail } from '../Email/UpdateEmail';
import { UpdatePassword } from '../Password/UpdatePassword';

import styles from './UpdateProfile.module.css';


export const UpdateProfile = () => {
	const { currentUser } = useAuth();

	return (
		<ContentLayout title="Update Profile">
			<div className={styles.updateProfile}>
				<h3>Update your Personal Infomation</h3>
				<UpdateDisplayName placeHolder={currentUser.displayName} />
				<UpdateEmail placeHolder={currentUser.email} />
				<UpdatePassword />
				<div className={styles.backBtn}>
					<Link to="..">Go Back</Link>
				</div>
			</div>
		</ContentLayout>
	);
};
