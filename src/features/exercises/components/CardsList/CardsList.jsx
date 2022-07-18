import { Card } from '../Card/Card';

import styles from './CardsList.module.css';
export const CardsList = ({ cards = [] }) => {
	return (
		cards && (
			<div className={styles.cardsList}>
				{cards.map((card) => (
					<Card key={card.id} name={card.name} equipment={card.equipment[0]} />
				))}
			</div>
		)
	);
};
