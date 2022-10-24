import { useState, createContext, useContext } from 'react';
import cx from 'classnames';
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
	const [openModal, setOpenModal] = useState(false);
	const value = { openModal, setOpenModal };

	return (
		<ToggleContext.Provider value={value}>{children}</ToggleContext.Provider>
	);
};

Modal.Content = function ModalContent({
	contentLabel = 'Modal Content',
	addClassName,
	children,
	...rest
}) {
	const { openModal, setOpenModal } = useToggleContext();

	return (
		<Dialog
			aria-label={contentLabel}
			isOpen={openModal}
			className={cx(styles.modalContainer, addClassName)}
			{...rest}
		>
			<DeleteBtn
				onClick={() => setOpenModal(false)}
				x={true}
				btnClassName={styles.modalCloseBtn}
				size={20}
			/>

			{children}
		</Dialog>
	);
};

Modal.Title = function ModalTitle({ Element = Button, children, ...rest }) {
	const { setOpenModal } = useToggleContext();
	return (
		<Element
			onClick={() => setOpenModal(true)}
			aria-label="open modal button"
			{...rest}
		>
			{children}
		</Element>
	);
};
