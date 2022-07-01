import { useState } from 'react';
import { Link } from 'react-router-dom';

import cx from 'classnames';
import { useAuth } from 'features/auth';
import { ContentLayout } from 'components/Layout';

import {
	updateUserPassword,
	updateUserEmail,
	updateUserDisplayName,
} from 'features/users';

import { Button } from 'components/Elements';
import styles from './UpdateProfile.module.css';
import { useUpdate } from 'features/users/hooks/useUpdate';
import { InputForm } from '../InputForm/InputForm';

const defaultFormFields = {
	displayName: '',
	email: '',
	password: '',
	confirmPassword: '',
};

export const UpdateProfile = () => {
	const { currentUser } = useAuth();
	const { update, isError, isLoading } = useUpdate();
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { email, password, displayName, confirmPassword } = formFields;

	const handleFormInput = (e) => {
		const { name, value } = e.target;
		setFormFields({ ...formFields, [name]: value });
	};

	const handleDisplayName = async () => {
		await update(updateUserDisplayName, displayName);
		console.log('updated name');
		window.location.reload();
	};

	const handleEmail = async () => {
		await update(updateUserEmail, email);
		console.log('updated email');
		window.location.reload();
	};

	const handlePassword = async () => {
		await update(updateUserPassword, password);
		console.log('updated password');
		window.location.reload();
	};

	return (
		<ContentLayout title="Update Profile">
			<div className={styles.updateProfile}>
				<h3>Update your Personal Infomation</h3>
				{isError && <span>{isError}</span>}

				<div className={styles.inputFormUpdate}>
					<div>
						<label htmlFor="displayName">Username</label>
						<input
							onChange={handleFormInput}
							value={displayName}
							type="text"
							name="displayName"
							placeholder={currentUser.displayName}
						/>
					</div>
					<Button onClick={handleDisplayName} isLoading={isLoading}>
						Update
					</Button>
				</div>

				<div className={styles.inputFormUpdate}>
					<div>
						<label htmlFor="email">Email Address</label>
						<input
							onChange={handleFormInput}
							value={email}
							type="email"
							name="email"
							placeholder={currentUser.email}
						/>
					</div>
					<Button onClick={handleEmail} isLoading={isLoading}>
						Update
					</Button>
				</div>

				<div className={cx(styles.inputFormUpdate, styles.passContainer)}>
					<div>
						<label htmlFor="password">Password</label>
						<input
							onChange={handleFormInput}
							value={password}
							type="password"
							name="password"
							placeholder="Password"
						/>
					</div>
					<div>
						<label htmlFor="confirmPassword">Confirm Password</label>
						<input
							onChange={handleFormInput}
							value={confirmPassword}
							type="password"
							name="confirmPassword"
							placeholder="Confirm Password"
						/>
					</div>
					<Button onClick={handlePassword} isLoading={isLoading}>
						Update
					</Button>
				</div>

				<div className={styles.backBtn}>
					<Link to="..">Go Back</Link>
				</div>
			</div>
		</ContentLayout>
	);
};
