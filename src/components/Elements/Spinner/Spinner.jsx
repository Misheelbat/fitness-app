import cx from 'classnames';

import { CircleNotch } from 'phosphor-react';
import styles from './Spinner.module.css';

export const Spinner = ({ size = '30', variant = 'primary' }) => {
	return (
		<CircleNotch className={cx(styles.spinner, styles[variant])} size={size} />
	);
};
