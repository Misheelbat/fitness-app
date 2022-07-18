import { extractEquipment } from 'features/exercises';
import styles from './Card.module.css';

export const Card = ({ exercise, equipments }) => {
	const equipment = extractEquipment(equipments);
	return (
		<div className={styles.card}>
			<img src="/images/logo.png" alt="exercise" />
			<div className={styles.cardInfo}>
				<h4>{exercise}</h4>
				<div className={styles.equipment}>
					{equipment && equipment.map((e) => <p key={e}>{e},</p>)}
				</div>
			</div>
		</div>
	);
};
