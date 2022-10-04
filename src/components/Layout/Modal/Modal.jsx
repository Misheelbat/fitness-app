import { useState, createContext, useContext } from 'react';

import { Dialog } from '@reach/dialog';
import { Button, DeleteBtn } from 'components/Elements';

// react dialog css must be imported before styles.module
import '@reach/dialog/styles.css';
import styles from './Modal.module.css';

const ToggleContext = createContext();
const useToggleContext = () => {
	const context = useContext(ToggleContext);
	if (!context) {
		throw new Error(`Component cannot be used outside Modal Component`);
	}
	return context;
};

export const Modal = ({ children }) => {
	const [openModal, setOpenModal] = useState('closed');
	const value = { openModal, setOpenModal };

	return <ToggleContext.Provider value={value}>{children}</ToggleContext.Provider>;
};

Modal.Content = function ModalContent({ contentLabel = 'Modal Content', children, ...rest }) {
	const { openModal, setOpenModal } = useToggleContext();

	return (
		<Dialog
			aria-label={contentLabel}
			isOpen={openModal === 'open'}
			className={styles.modalContainer}
			{...rest}
		>
			<DeleteBtn
				onClick={() => setOpenModal('close')}
				x={true}
				btnClassName={styles.modalCloseBtn}
				size={20}
			/>

			{children}
		</Dialog>
	);
};

Modal.Title = function ModalTitle({ children, ...rest }) {
	const { setOpenModal } = useToggleContext();
	return (
		<Button onClick={() => setOpenModal('open')} {...rest}>
			{children}
		</Button>
	);
};
