import { useState } from 'react';
import { User } from 'phosphor-react/dist/';
import { Link } from 'react-router-dom';

import SearchForm from 'components/Elements/Searchbar/SearchForm';

import styles from './Headerbar.module.css';

const UserNav = () => {
	const [open, setOpen] = useState(false);
	const userNavItems = [
		{
			name: 'Your Profile',
			to: './profile',
			onClick: () => {
				setOpen(false);
			},
		},
		{
			name: 'Signout',
			to: '',
			onClick: () => {
				console.log('user logged out');
				setOpen(false);
			},
		},
	];
	return (
		<div className={styles.userNav}>
			<div>
				<button aria-label="open user menu" onClick={() => setOpen(!open)}>
					<User size="4" />
				</button>
			</div>
			<div className={styles.userNavItems}>
				{open &&
					userNavItems.map((item) => (
						<Link key={item.name} to={item.to} onClick={item.onClick}>
							{item.name}
						</Link>
					))}
			</div>
		</div>
	);
};

export default function Headerbar() {
	return (
		<header className={styles.headerbar}>
			<SearchForm />
			<UserNav />
		</header>
	);
}
