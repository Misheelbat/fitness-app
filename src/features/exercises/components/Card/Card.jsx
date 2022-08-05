import { useMemo } from 'react';
import { useDispatch } from 'react-redux';

import { extractEquipment, setExercise } from 'features/exercises';
import styles from './Card.module.css';

export const Card = ({ exercise, equipments, exId }) => {
	const dispatch = useDispatch();
	const equipment = useMemo(() => extractEquipment(equipments), [equipments]);

	const handleClick = () => {
		if (!exId) return;
		dispatch(setExercise(exId));
	};
	
	return (
		<div className={styles.card} onClick={handleClick}>
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
