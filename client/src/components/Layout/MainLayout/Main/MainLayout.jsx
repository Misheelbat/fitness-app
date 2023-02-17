import { useState } from 'react';
import { Sidebar } from '../Sidebar/Sidebar';
import Headerbar from '../Headerbar/Headerbar';

import styles from './MainLayout.module.css';

export const MainLayout = ({ children }) => {
	const [sidebarOpen, setSidebarOpen] = useState(false);

	return (
		<div className={styles.mainLayout}>
			<Sidebar />
			<Sidebar.Mobile openModal={sidebarOpen} setOpenModal={setSidebarOpen} />
			<section className={styles.content}>
				<Headerbar openSidebar={setSidebarOpen} />
				<main>{children}</main>
			</section>
		</div>
	);
};
