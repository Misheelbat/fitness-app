import cx from 'classnames';

import { CircleNotch } from 'phosphor-react';
import styles from './Spinner.module.css';

export const Spinner = ({ size = '30', variant = '' }) => {
	return (
		<CircleNotch className={cx(styles.spinner, styles[variant])} size={size} />
	);
};

export const PageSpinner = ({ size = '80', variant = 'primary' }) => {
	return (
		<div style={{ display: 'grid', placeContent: 'center', height: '100vh' }}>
			<Spinner size={size} variant={variant} />
		</div>
	);
};
