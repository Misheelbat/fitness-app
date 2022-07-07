import { Head } from 'components/Head';

import styles from './ContentLayout.module.css';
export const ContentLayout = ({ children, title }) => {
	return (
		<>
			<Head title={title} />
			<div className={styles.contentLayout}>
				<section className={styles.header}>
					<h1>{title}</h1>
				</section>
				<section className={styles.content}>{children}</section>
			</div>
		</>
	);
};
