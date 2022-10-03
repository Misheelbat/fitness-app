import { Dialog } from '@reach/dialog';
import '@reach/dialog/styles.css';
import { useState } from 'react';
import { XCircle } from 'phosphor-react';

import styles from './Modal.module.css';
export const Modal = ({ children, ...rest }) => {
	const [openModal, setOpenModal] = useState('closed');

	return (
		<>
			<button onClick={() => setOpenModal('open')}>open</button>
			<Dialog isOpen={openModal === 'open'} {...rest} className={styles.modalContainer}>
				<button onClick={() => setOpenModal('close')} className={styles.modalCloseBtn}>
					<XCircle size={20} />
				</button>
				{children}
			</Dialog>
		</>
	);
};
