import { useState } from 'react';
import { Link } from 'react-router-dom';

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

const defaultFormFields = {
	displayName: '',
	email: '',
	password: '',
};

export const UpdateProfile = () => {
	const { currentUser } = useAuth();
	const { update, isError, isLoading } = useUpdate();
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { email, password, displayName } = formFields;

	const handleFormInput = (e) => {
		const { name, value } = e.target;
		setFormFields({ ...formFields, [name]: value });
	};

	const handleDisplayName = async () => {
		if (displayName === currentUser.displayName) return;
		await update(updateUserDisplayName, displayName);
		console.log('updated name');
	};

	return (
		<ContentLayout title="Update Profile">
			<div className={styles.loginForm}>
				<h3>Update your Personal Infomation</h3>
				{isError && <span>{isError}</span>}

				<label htmlFor="displayName">
					<span>Username</span>
					<input
						onChange={handleFormInput}
						value={displayName}
						type="text"
						name="displayName"
						placeholder={currentUser.displayName}
					/>
					<Button onClick={handleDisplayName} isLoading={isLoading}>
						Update
					</Button>
				</label>
				<label htmlFor="email">
					<span>Email Address</span>
					<input
						onChange={handleFormInput}
						value={email}
						type="email"
						name="email"
						placeholder={currentUser.email}
					/>
				</label>
				<label htmlFor="password">
					<span>Password</span>
					<input
						onChange={handleFormInput}
						value={password}
						type="password"
						name="password"
						placeholder="Password"
					/>
				</label>
				<div className={styles.btnGroup}>
					<Button isLoading={isLoading}>Save</Button>
					<div className={styles.register}>
						<Link to="..">Go Back</Link>
					</div>
				</div>
			</div>
		</ContentLayout>
	);
};
