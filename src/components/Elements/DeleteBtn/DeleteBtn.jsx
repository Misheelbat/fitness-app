import { Trash, XCircle } from 'phosphor-react';
import cx from 'classnames';

import styles from './DeleteBtn.module.css';

export const DeleteBtn = ({ x = false, size = 18, btnClassName, ...props }) => {
	return (
		<button className={cx(styles.deleteBtn, btnClassName)} {...props}>
			{x ? <XCircle size={size} /> : <Trash size={15} weight="bold" />}
		</button>
	);
};
