import { useState } from 'react';
import { toast } from 'react-toastify';

import { Button } from 'components/Elements';

import { transformErrMSg } from 'utils';
import { useLazyChangeEmailQuery } from 'features/users';
import styles from './UpdateEmail.module.css';

export const UpdateEmail = ({ placeHolder = 'email' }) => {
	const [update, { isLoading }] = useLazyChangeEmailQuery();
	const [email, setEmail] = useState('');

	const handleEmail = async () => {
		try {
			await update(email);
			toast.success('Successfully update Email');
		} catch (error) {
			toast.error(transformErrMSg(error));
		}
	};

	return (
		<div className={styles.inputFormUpdate}>
			<div>
				<label htmlFor="email">Email Address</label>
				<input
					onChange={(e) => setEmail(e.target.value)}
					value={email}
					type="email"
					name="email"
					placeholder={placeHolder}
				/>
			</div>
			<Button onClick={handleEmail} isLoading={isLoading}>
				Update
			</Button>
		</div>
	);
};
