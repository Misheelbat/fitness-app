import { XCircle } from 'phosphor-react';

import { Button } from 'components/Elements';
import styles from './Confirm.module.css';

export const Confirm = ({ close, title, onDeleteClick }) => {
	const onModalClick = async (e) => {
		e.stopPropagation();
	};
	const onDelete = (e) => {
		e.stopPropagation();
		onDeleteClick();
		close(false);
	};

	return (
		<div className={styles.confirmContainer} onClick={onModalClick}>
			<div className={styles.confirmModal}>
				<div className={styles.confirmHeader}>
					<p>Delete workout {title}?</p>
					<button onClick={() => close(false)} className={styles.closeBtn}>
						<XCircle size={20} />
					</button>
				</div>

				<Button onClick={onDelete} buttonType="max-width">
					Delete
				</Button>
			</div>
		</div>
	);
};
