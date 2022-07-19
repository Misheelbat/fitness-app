import { Card } from '../Card/Card';
import { Spinner } from 'components/Elements';

import styles from './CardsList.module.css';
export const CardsList = ({ cards = [], isLoading }) => {
	let content = '';

	if (isLoading) {
		content = <Spinner size="50" variant="primary" />;
	} else {
		content = cards.map((card) => (
			<Card key={card.id} exercise={card.name} equipments={card.equipment} />
		));
	}

	return <div className={styles.cardsList}>{content}</div>;
};
