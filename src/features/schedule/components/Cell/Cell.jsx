import cx from 'classnames';
import styles from './Cell.module.css';

export const Cell = ({ onClick, children, className, isActive = false }) => {
	return (
		<div onClick={!isActive ? onClick : undefined} className={cx(styles.cell, className)}>
			{children}
		</div>
	);
};
