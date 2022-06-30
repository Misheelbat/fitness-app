import { Head } from 'components/Head';

import styles from './ContentLayout.module.css';
export const ContentLayout = ({ children, title }) => {
	return (
		<>
			<Head title={title} />
			<div className={styles.contentLayout}>
				<div className={styles.contentLayoutHeader}>
					<h1>{title}</h1>
				</div>
				<div className={styles.contentLayoutContent}>{children}</div>
			</div>
		</>
	);
};
