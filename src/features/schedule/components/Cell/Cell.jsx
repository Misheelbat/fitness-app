import { memo } from 'react';
import cx from 'classnames';
import styles from './Cell.module.css';

export let Cell = ({ onClick, children, className, isActive = false, event }) => {
	let content;
	if (event) {
		content = (
			<div className={cx(styles.card, styles[event.status])}>
				<span>{children}</span>
				<span>{event.name}</span>
			</div>
		);
	} else {
		content = children;
	}

	return (
		<div onClick={!isActive ? onClick : undefined} className={cx(styles.cell, className, isActive ? styles.active : null)}>
			{content}
		</div>
	);
};

Cell = memo(Cell);
