import { useState } from 'react';

import { Sidebar } from '../Sidebar/Sidebar';
import Headerbar from '../Headerbar/Headerbar';

import styles from './MainLayout.module.css';

export const MainLayout = ({ children }) => {
	const [mobileNavToggle, setMobileNavToggle] = useState(false);
	
	return (
		<div className={styles.mainLayout}>
			<Sidebar mobileNavToggle={mobileNavToggle} />
			<section className={styles.content}>
				<Headerbar
					mobileNavToggle={mobileNavToggle}
					setMobileNavToggle={setMobileNavToggle}
				/>
				<main>{children}</main>
			</section>
		</div>
	);
};
