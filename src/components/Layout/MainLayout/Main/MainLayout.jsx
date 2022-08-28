import { Sidebar } from '../Sidebar/Sidebar';
import Headerbar from '../Headerbar/Headerbar';


import styles from './MainLayout.module.css';
export const MainLayout = ({ children }) => {
	return (
		<div className={styles.mainLayout}>
			<Sidebar />
			<section className={styles.content}>
				<Headerbar />
				<main>{children}</main>
			</section>
		</div>
	);
};
