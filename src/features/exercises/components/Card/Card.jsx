import styles from './Card.module.css';

export const Card = ({ name, equipment }) => {
	return (
		<div className={styles.card}>
			<img src="/images/logo.png" alt="exercise" />
			<div className={styles.cardInfo}>
				<h4>{name}</h4>
				<p>{equipment}</p>
			</div>
		</div>
	);
};
