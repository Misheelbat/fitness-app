import { useState } from 'react';
import cx from 'classnames';
import { toast } from 'react-toastify';

import { Button } from 'components/Elements';

import { transformErrMSg } from 'utils';
import { useLazyChangePasswordQuery } from 'features/users';
import styles from './UpdatePassword.module.css';

export const UpdatePassword = () => {
	const [update, { isLoading }] = useLazyChangePasswordQuery();
	const [pass, setPass] = useState('');
	const [confirmPass, setConfirmPass] = useState('');

	const handlePassword = async () => {
		if (pass !== confirmPass) {
			toast.error('Passwords do not match');
			return;
		}
		try {
			await update(pass);
			toast.success('Successfully update Password');
		} catch (error) {
			toast.error(transformErrMSg(error));
		}
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
