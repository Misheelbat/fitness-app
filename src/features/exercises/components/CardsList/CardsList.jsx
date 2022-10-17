import { useMediaQuery } from 'hooks/useMediaQuery ';
import { Card } from '../Card/Card';
import { Spinner } from 'components/Elements';
import { Modal } from 'components/Layout';
import { ExercisePreview } from '..';

import styles from './CardsList.module.css';
export const CardsList = ({ cards = [], isLoading }) => {
	const matches = useMediaQuery(900);
	let content;

	if (matches && !isLoading) {
		content = cards.map(({ id, name, equipment }) => (
			<Modal key={id}>
				<Modal.Title Element="div">
					<Card key={id} exercise={name} equipments={equipment} exId={id} />
				</Modal.Title>
				<Modal.Content addClassName={styles.mobileView}>
					<ExercisePreview id={id} />
				</Modal.Content>
			</Modal>
		));
	}
	if (isLoading) {
		content = (
			<div className={styles.cardsList}>
				<Spinner size="50" variant="primary" />
			</div>
		);
	}
	if (!matches && !isLoading) {
		content = cards.map(({ id, name, equipment }) => (
			<Card key={id} exercise={name} equipments={equipment} exId={id} />
		));
	}

	return <div className={styles.cardsList}>{content}</div>;
};
