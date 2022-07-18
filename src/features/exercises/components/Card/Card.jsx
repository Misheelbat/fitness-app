import styles from './Card.module.css';

export const Card = () => {
	return (
		<div className={styles.card}>
			<img src="/images/logo.png" alt="exercise" />
			<div className={styles.cardInfo}>
				<h4>Bent over Barbell Row</h4>
				<p>Barbell</p>
			</div>
		</div>
	);
};
