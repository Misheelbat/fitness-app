import { Head } from 'components/Head';

import styles from './Layout.module.css';
export const Layout = ({ children, title }) => {
	return (
		<>
			<Head title={title} />
			<section className={styles.authLayout}>
				<div className={styles.authLayoutContainer}>
					<header className={styles.authLayoutHeader}>
						<h2>{title}</h2>
					</header>
					<main className={styles.authLayoutContent}>{children}</main>
				</div>
			</section>
		</>
	);
};
