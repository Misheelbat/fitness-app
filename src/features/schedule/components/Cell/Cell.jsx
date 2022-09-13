import { memo } from 'react';
import cx from 'classnames';
import styles from './Cell.module.css';

export let Cell = ({ onClick, children, className, isActive = false, event }) => {
	return (
		<div onClick={!isActive ? onClick : undefined} className={cx(styles.cell, className, isActive ? styles.active : null)}>
			<div className={event ? styles.card : null}>
				<span>{children}</span>
				{event && <span>{event}</span>}
			</div>
		</div>
	);
};

Cell = memo(Cell);
