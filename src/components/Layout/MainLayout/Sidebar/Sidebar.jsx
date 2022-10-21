import { NavLink } from 'react-router-dom';
import { Dialog } from '@reach/dialog';

import { DeleteBtn } from 'components/Elements';

import {
	Barbell,
	SquaresFour,
	CalendarPlus,
	CheckSquareOffset,
} from 'phosphor-react';
import cx from 'classnames';

import '@reach/dialog/styles.css';
import styles from './Sidebar.module.css';

const NavItem = ({ className, Onclick }) => {
	const navItems = [
		{ name: 'Dashboard', to: '.', icon: SquaresFour },
		{ name: 'Exercises List', to: 'exercises', icon: Barbell },
		{ name: 'Workout Plans', to: 'workouts', icon: CheckSquareOffset },
		{ name: 'Schedule', to: 'schedule', icon: CalendarPlus },
	];

	return (
		<nav>
			{navItems.map((item, index) => (
				<NavLink
					key={item.name}
					to={item.to}
					className={cx(styles.navItem, className)}
					end={index === 0}
					onClick={Onclick}
				>
					<item.icon size="32" />
					<span>{item.name}</span>
				</NavLink>
			))}
		</nav>
	);
};

export const Sidebar = () => {
	return (
		<section className={styles.sidebar}>
			<NavItem />
		</section>
	);
};

Sidebar.Mobile = function MobileSideBar({ openModal, setOpenModal, ...rest }) {
	const close = () => setOpenModal(false);
	return (
		<Dialog
			aria-label={'Mobile sidebar navigation'}
			isOpen={openModal}
			className={styles.mobileNav}
			{...rest}
		>
			<div className={styles.mobileNavCloseBtn}>
				<DeleteBtn onClick={close} x={true} size={30} />
			</div>
			<NavItem className={styles.mobileNavItems} Onclick={close} />
		</Dialog>
	);
};
