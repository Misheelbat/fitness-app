import React from 'react';
import { Button } from 'components/Elements';
import styles from './InputForm.module.css';

export const InputForm = ({
	name,
	value,
	type = 'text',
	title,
	onClick,
	isLoading,
	handleClick,
	...otherProps
}) => {
	return (
		<form className={styles.inputForm}>
			<label htmlFor={name}>{title}</label>
			<input type={type} name={name} {...otherProps} />
			<Button onClick={handleClick} isLoading={isLoading}>
				Update
			</Button>
		</form>
	);
};
