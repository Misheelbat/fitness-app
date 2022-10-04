import { Trash, XCircle } from 'phosphor-react';

import styles from './DeleteBtn.module.css';

export const DeleteBtn = ({ x = false, ...props }) => {
	return (
		<button className={styles.deleteBtn} {...props}>
			{x ? <XCircle size={18} /> : <Trash size={18} weight="bold" />}
		</button>
	);
};
