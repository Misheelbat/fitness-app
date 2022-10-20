import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { setExercise } from 'features/exercises';
import { selectDisplayName, useSignOutMutation } from 'features/auth';

import { User, List } from 'phosphor-react';
import { SearchBar } from 'components/Searchbar/SearchBar';

import styles from './Headerbar.module.css';

const UserNav = () => {
	const [logOut] = useSignOutMutation();
	const user = useSelector(selectDisplayName);
	const [openUserMenu, setOpenUserMenu] = useState(false);

	const userNavItems = [
		{
			name: 'Your Profile',
			to: './profile',
			onClick: () => {
				setOpenUserMenu(false);
			},
		},
		{
			name: 'Signout',
			to: '../',
			onClick: async () => {
				await logOut();
				setOpenUserMenu(false);
			},
		},
	];

	const content = userNavItems.filter((item) => {
		if (user === 'Guest' && item.name === 'Your Profile') {
			return false;
		}
		return item;
	});

	return (
		<div className={styles.userNav}>
			{user && <span className={styles.userName}>{user}</span>}
			<div>
				<div>
					<button
						aria-label="open user menu"
						onClick={() => setOpenUserMenu(!openUserMenu)}
					>
						<User size="35" />
					</button>
				</div>
				<div className={styles.userNavItems}>
					{openUserMenu &&
						content.map((item) => (
							<Link key={item.name} to={item.to} onClick={item.onClick}>
								{item.name}
							</Link>
						))}
				</div>
			</div>
		</div>
	);
};

export default function Headerbar({ openSidebar }) {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleClick = (exId) => {
		if (!exId) return;
		dispatch(setExercise(exId));
		navigate(`exercises/${exId}`);
	};

	return (
		<header className={styles.headerbar}>
			<div className={styles.navBtn}>
				<button
					className={styles.mobileNavBtn}
					onClick={() => openSidebar(true)}
				>
					<List size={20} weight="thin" />
				</button>
			</div>

			<SearchBar
				className={styles.searchBarInHeader}
				onResultsClick={handleClick}
			/>
			<UserNav />
		</header>
	);
}
