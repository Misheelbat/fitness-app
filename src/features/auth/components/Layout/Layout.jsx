import { Head } from 'components/Head';

import styles from './Layout.module.css';
export const Layout = ({ children, title }) => {
	return (
		<>
			<Head title={title} />
			<div className={styles.authLayout}>
				<div className={styles.authLayoutContainer}>
					<div className={styles.authLayoutHeader}>
						<h2>{title}</h2>
					</div>
					<div className={styles.authLayoutContent}>{children}</div>
				</div>
			</div>
		</>
	);
};
