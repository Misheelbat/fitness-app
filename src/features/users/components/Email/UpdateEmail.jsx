import { useState } from 'react';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';

import { updateUserEmail } from 'features/users';
import { Button } from 'components/Elements';
import { transformErrMSg } from 'utils';

import styles from './UpdateEmail.module.css';

export const UpdateEmail = ({ placeHolder }) => {
	const { isLoading, mutate } = useMutation(updateUserEmail);
	const [email, setEmail] = useState('');

	const handleEmail = async () => {
		mutate(email, {
			onSuccess: () => {
				toast.success('Successfully update Email', {
					onClose: () => window.location.reload(),
				});
			},
			onError: (err) => toast.error(transformErrMSg(err.message)),
		});
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
