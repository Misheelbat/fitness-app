import { Trash } from 'phosphor-react';

import styles from './DeleteBtn.module.css';

export const DeleteBtn = ({ ...props }) => {
	return (
		<button className={styles.deleteBtn} {...props}>
			<Trash size={15} weight="bold" />
		</button>
	);
};
