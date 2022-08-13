import styles from './Template.module.css';

export const Template = () => {
	return (
		<div className={styles.template}>
			<div className={styles.templateInfo}>
				<h5>Core Blast</h5>
				<div>
					<p>TOTAL DURATION</p>
					<span>23 min</span>
				</div>
			</div>
		</div>
	);
};
