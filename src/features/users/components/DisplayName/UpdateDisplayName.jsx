import { useState } from 'react';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';

import { updateUserDisplayName } from 'features/users';
import { Button } from 'components/Elements';

import styles from './updateDisplayName.module.css';

export const UpdateDisplayName = ({ placeHolder }) => {
	const { isLoading, mutate } = useMutation(updateUserDisplayName);
	const [displayName, setDisplayName] = useState('');
	
	const handleDisplayName = async () => {
		mutate(displayName, {
			onSuccess: () => {
				toast.success('Successfully update Username', {
					onClose: () => window.location.reload(),
				});
			},
			onError: (err) => toast.error(err.message),
		});
	};
	
	return (
		<div className={styles.inputFormUpdate}>
			<div>
				<label htmlFor="displayName">Username</label>
				<input
					onChange={(e) => setDisplayName(e.target.value)}
					value={displayName}
					type="text"
					name="displayName"
					placeholder={placeHolder}
				/>
			</div>
			<Button onClick={handleDisplayName} isLoading={isLoading}>
				Update
			</Button>
		</div>
	);
};
