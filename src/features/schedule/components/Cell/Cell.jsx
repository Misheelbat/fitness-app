import { memo } from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import styles from './Cell.module.css';

export let Cell = ({ onClick, children, className, isActive = false, event }) => {
	let content = children;
	if (event) {
		content = (
			<div className={cx(styles.card, styles[event.status])}>
				<span>{children}</span>
				<span className={styles.eventName}>
					<Link to={`/app/workouts/${event.name}`}>{event.name}</Link>
				</span>
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
