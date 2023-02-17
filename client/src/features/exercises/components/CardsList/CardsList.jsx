import { useMediaQuery } from 'hooks/useMediaQuery ';
import { Card } from '../Card/Card';
import { Spinner } from 'components/Elements';
import { Modal } from 'components/Modal/Modal';
import { ExercisePreview } from '..';

import styles from './CardsList.module.css';
export const CardsList = ({ cards = [], isLoading }) => {
	const isMobileWidth = useMediaQuery(900);

	let content;
	if (isLoading) {
		content = (
			<div className={styles.loading}>
				<Spinner size="50" variant="primary" />
			</div>
		);
	}

	// if window size is 900px or smaller wrap card component in modal,
	// using the the card itself as modal opening button
	if (isMobileWidth && !isLoading) {
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

	// if window size is bigger than 900px render card as it is
	if (!isMobileWidth && !isLoading) {
		content = cards.map(({ id, name, equipment }) => (
			<Card key={id} exercise={name} equipments={equipment} exId={id} />
		));
	}

	return <div className={styles.cardsList}>{content}</div>;
};
