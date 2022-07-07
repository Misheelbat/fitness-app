import { useState } from 'react';
import { useMutation } from 'react-query';
import cx from 'classnames';
import { toast } from 'react-toastify';

import { updateUserPassword } from 'features/users';
import { transformErrMSg } from 'utils';
import { Button } from 'components/Elements';

import styles from './UpdatePassword.module.css';

export const UpdatePassword = () => {
	const { isLoading, mutate } = useMutation(updateUserPassword);
	const [pass, setPass] = useState('');
	const [confirmPass, setConfirmPass] = useState('');

	const handlePassword = async () => {
		if (pass !== confirmPass) {
			throw new Error('(/Passwords do not match)');
		}
		mutate(pass, {
			onSuccess: () => {
				toast.success('Successfully update Password', {
					onClose: () => window.location.reload(),
				});
			},
			onError: (err) => toast.error(transformErrMSg(err.message)),
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
