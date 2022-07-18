import { Card } from '../Card/Card';
import { Spinner } from 'components/Elements';

import styles from './CardsList.module.css';
export const CardsList = ({ cards = [], isLoading }) => {
	return (
		<div className={styles.cardsList}>
			{isLoading ? (
				<Spinner />
			) : (
				cards.map((card) => (
					<Card
						key={card.id}
						exercise={card.name}
						equipments={card.equipment}
					/>
				))
			)}
		</div>
	);
};
