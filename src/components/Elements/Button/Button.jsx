import cx from 'classnames';
import styles from './Button.module.css';
export const BUTTON_TYPES = {
	google: 'google-sign',
	inverted: 'inverted',
};
export const Button = ({ children, buttonType, ...otherProps }) => {
	return (
		<button
			className={cx(styles.buttonContainer, styles[buttonType])}
			{...otherProps}
		>
			{children}
		</button>
	);
};
