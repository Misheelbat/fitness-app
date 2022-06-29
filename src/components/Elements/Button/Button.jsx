import cx from 'classnames';

import { Spinner } from '../Spinner/Spinner';

import styles from './Button.module.css';

export const BUTTON_TYPES = {
	google: 'google-sign',
	inverted: 'inverted',
};
export const Button = ({ children, buttonType, isLoading, ...otherProps }) => {
	return (
		<button
			className={cx(styles.buttonContainer, styles[buttonType])}
			{...otherProps}
		>
			{isLoading ? <Spinner /> : children}
		</button>
	);
};
