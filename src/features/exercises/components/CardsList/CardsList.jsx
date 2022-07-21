import { Card } from '../Card/Card';
import { Spinner } from 'components/Elements';

import styles from './CardsList.module.css';
export const CardsList = ({ cards = [], isLoading }) => {
	if (isLoading) {
		return (
			<div className={styles.cardsList}>
				<Spinner size="50" variant="primary" />
			</div>
		);
	}

	return (
		<div className={styles.cardsList}>
			{cards.map(({ id, name, equipment }) => (
				<Card key={id} exercise={name} equipments={equipment} exId={id} />
			))}
		</div>
	);
};
