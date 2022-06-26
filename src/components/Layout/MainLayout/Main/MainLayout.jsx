import { Sidebar } from '../Sidebar/Sidebar';
import Headerbar from '../Headerbar/Headerbar';

import styles from './MainLayout.module.css';
export const MainLayout = ({ children }) => {
	return (
		<div className={styles.mainLayout}>
			<Sidebar />
			<div className={styles.rightSide}>
				<Headerbar />
				<main>{children}</main>
			</div>
		</div>
	);
};
