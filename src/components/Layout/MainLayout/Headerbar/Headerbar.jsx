import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { User } from 'phosphor-react/dist/';

import { useAuth } from 'features/auth';
import { selectDisplayName, useLazySignOutQuery } from 'features/auth';
import { SearchForm } from 'components/Searchbar';
import { useSearchExerciseMutation } from 'features/exercises';

import styles from './Headerbar.module.css';

const UserNav = () => {
	const [logOut] = useLazySignOutQuery();
	const user = useSelector(selectDisplayName);
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
			to: '../',
			onClick: async () => {
				setOpen(false);
				await logOut();
			},
		},
	];

	return (
		<div className={styles.userNav}>
			{user && <span className={styles.userName}>{user}</span>}
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
