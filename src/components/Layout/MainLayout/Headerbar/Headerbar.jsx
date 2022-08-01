import { useState } from 'react';
import { Link } from 'react-router-dom';
import { User } from 'phosphor-react/dist/';

import { useAuth } from 'features/auth';
import { SearchForm } from 'components/Searchbar';
import { useSearchExerciseMutation } from 'features/exercises';

import styles from './Headerbar.module.css';

const UserNav = () => {
	const { currentUser, logOut } = useAuth();
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
				setOpen(false);
				logOut();
			},
		},
	];

	return (
		<div className={styles.userNav}>
			{currentUser && (
				<span className={styles.userName}>{currentUser.displayName}</span>
			)}
			<div>
				<div>
					<button aria-label="open user menu" onClick={() => setOpen(!open)}>
						<User size="35" />
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
		</div>
	);
};

export default function Headerbar() {
	const [search, result] = useSearchExerciseMutation();
	return (
		<header className={styles.headerbar}>
			<SearchForm searchFn={search} results={result} />
			<UserNav />
		</header>
	);
}
