import { XCircle } from 'phosphor-react';
import styles from './EventModal.module.css';

export const EventModal = ({ close, selectedDate, event = {} }) => {
	const handleClick = () => {
		close(false);
	};
	return (
		<div className={styles.eventModalContainer}>
			<div className={styles.eventModal}>
				<button onClick={handleClick} className={styles.closeBtn}>
					<XCircle size={20} />
				</button>
				<div>
					{selectedDate} - {event?.name}
				</div>
			</div>
		</div>
	);
};
