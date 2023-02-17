import { useState } from 'react';
import { toast } from 'react-toastify';

import { Button } from 'components/Elements';

import { useLazyChangeNameQuery } from 'features/users/store/api/userApi';
import { transformErrMSg } from 'utils';

import styles from './updateDisplayName.module.css';

export const UpdateDisplayName = ({ placeHolder = 'username' }) => {
	const [updateDisplayName, { isLoading }] = useLazyChangeNameQuery();
	const [displayName, setDisplayName] = useState('');

	const handleDisplayName = async () => {
		try {
			await updateDisplayName(displayName).unwrap();
			toast.success('Successfully update Username');
		} catch (error) {
			toast.error(transformErrMSg(error));
		}
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
					id="displayName"
				/>
			</div>
			<Button onClick={handleDisplayName} isLoading={isLoading}>
				Update
			</Button>
		</div>
	);
};
