import { memo } from 'react';
import cx from 'classnames';
import styles from './Cell.module.css';

export let Cell = ({ onClick, children, className, isActive = false, event }) => {
	let content = children;
	if (event) {
		content = (
			<div className={cx(styles.card, styles[event.status])}>
				<span>{children}</span>
				<span className={styles.eventName}>{event.name}</span>
			</div>
		);
	}
	return (
		<div
			onClick={!isActive ? onClick : undefined}
			className={cx(styles.cell, className, isActive ? styles.active : null)}
		>
			{content}
		</div>
	);
};

Cell = memo(Cell);
