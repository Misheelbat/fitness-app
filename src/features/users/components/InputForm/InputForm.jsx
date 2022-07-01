import React, { useState } from 'react';
import { Button } from 'components/Elements';
import styles from './InputForm.module.css';

export const InputForm = ({ isLoading, handleClick, ...otherProps }) => {
	const [term, setTerm] = useState('');

	const handleSubmit = async () => {
		await handleClick(term);
	};
	return (
		<div className={styles.inputForm}>
			<input
				value={term}
				onChange={(e) => setTerm(e.target.value)}
				type="password"
				{...otherProps}
			/>
			<Button onClick={handleClick} isLoading={isLoading}>
				Confirm
			</Button>
		</div>
	);
};
