import { useState } from 'react';
import { useMutation } from 'react-query';

import cx from 'classnames';
import { updateUserPassword } from 'features/users';
import { Button } from 'components/Elements';

import styles from './UpdatePassword.module.css';

export const UpdatePassword = () => {
	const { isLoading, mutate } = useMutation(updateUserPassword);
	const [pass, setPass] = useState('');
	const [confirmPass, setConfirmPass] = useState('');

	const handlePassword = async () => {
		if (pass !== confirmPass) {
			throw new Error('Passwords do not match');
		}
		mutate(pass, {
			onSuccess: () => {
				console.log('Password updated');
				setPass('');
				setConfirmPass('');
			},
			onError: (err) => console.log('mutate', err),
		});
	};

	return (
		<div className={cx(styles.inputFormUpdate, styles.passContainer)}>
			<div>
				<label htmlFor="password">Password</label>
				<input
					onChange={(e) => setPass(e.target.value)}
					value={pass}
					type="password"
					name="password"
					placeholder="Password"
				/>
			</div>
			<div>
				<label htmlFor="confirmPassword">Confirm Password</label>
				<input
					onChange={(e) => setConfirmPass(e.target.value)}
					value={confirmPass}
					type="password"
					name="confirmPassword"
					placeholder="Confirm Password"
				/>
			</div>
			<Button onClick={handlePassword} isLoading={isLoading}>
				Reset
			</Button>
		</div>
	);
};
