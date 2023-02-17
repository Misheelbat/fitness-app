import cx from 'classnames';

import { Spinner } from '../Spinner/Spinner';

import styles from './Button.module.css';

export const BUTTON_TYPES = {
	max: 'max-width',
	inverted: 'inverted',
	add: 'add',
};

export const Button = ({ children, buttonType, isLoading, ...otherProps }) => {
	return (
		<button
			disabled={isLoading}
			className={cx(styles.buttonContainer, styles[buttonType])}
			{...otherProps}
		>
			{isLoading ? <Spinner /> : children}
		</button>
	);
};
