import { NavLink } from 'react-router-dom';

import {
	SquaresFour,
	Barbell,
	CheckSquareOffset,
	CalendarPlus,
} from 'phosphor-react';

import styles from './Sidebar.module.css';

const SideNavItem = () => {
	const navItems = [
		{ name: 'Dashboard', to: '.', icon: SquaresFour },
		{ name: 'Exercises List', to: 'exercises', icon: Barbell },
		{ name: 'Workout Plans', to: 'programms', icon: CheckSquareOffset },
		{ name: 'Schedule', to: 'schedule', icon: CalendarPlus },
	];

	return (
		<>
			{navItems.map((item, index) => (
				<NavLink
					key={item.name}
					to={item.to}
					className={styles.navItem}
					end={index === 0}
				>
					<item.icon size="32" />
					<span>{item.name}</span>
				</NavLink>
			))}
		</>
	);
};

export const Sidebar = () => {
	return (
		<section className={styles.sidebar}>
			<nav>
				<SideNavItem />
			</nav>
		</section>
	);
};
