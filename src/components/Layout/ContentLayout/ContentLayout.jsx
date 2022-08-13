import { Head } from 'components/Head';
import { Link } from 'react-router-dom';

import styles from './ContentLayout.module.css';
export const ContentLayout = ({ children, title, link }) => {
	return (
		<>
			<Head title={title} />
			<div className={styles.contentLayout}>
				<section className={styles.header}>
					<h1>{title}</h1>
					{link ? (
						<Link to={link} className={styles.navBtn}>
							Back
						</Link>
					) : null}
				</section>
				<section className={styles.content}>{children}</section>
			</div>
		</>
	);
};
