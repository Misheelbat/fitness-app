import React, { useState } from 'react';
import { useMutation } from 'react-query';

import { updateUserDisplayName } from 'features/users';
import { Button } from 'components/Elements';

import styles from './updateDisplayName.module.css';
export const UpdateDisplayName = ({ placeHolder }) => {
	const { isLoading, mutate } = useMutation(updateUserDisplayName);
	const [displayName, setDisplayName] = useState('');

	const handleDisplayName = async () => {
		mutate(displayName, {
			onSuccess: () => {
				console.log('updated name');
				window.location.reload();
			},
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
