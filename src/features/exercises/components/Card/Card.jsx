import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { Spinner } from 'components/Elements';

import { extractEquipment, setExercise } from 'features/exercises';
import styles from './Card.module.css';

export const Card = ({ loading, exercise = '', equipments = [], exId }) => {
	const dispatch = useDispatch();
	const equipment = useMemo(() => extractEquipment(equipments), [equipments]);

	const handleClick = () => {
		if (!exId) return;
		dispatch(setExercise(exId));
	};

	let content;
	if (loading) {
		content = (
			<div className={styles.cardLoader}>
				<Spinner variant="secondary" />
			</div>
		);
	}
	if (exercise) {
		content = (
			<div className={styles.cardInfo}>
				<h4>{exercise}</h4>
				<div className={styles.equipment}>{equipment && equipment.map((e) => <p key={e}>{e},</p>)}</div>
			</div>
		);
	}

	return (
		<div className={styles.card} onClick={handleClick}>
			<img src="/images/logo.png" alt="exercise" />
			{content}
		</div>
	);
};
