import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from './ToastProvider.module.css';
export const ToastProvider = () => {
	return (
		<ToastContainer
			className={styles.toastContainer}
			autoClose={500}
			pauseOnHover={false}
			pauseOnFocusLoss={false}
			draggable={false}
			limit="1"
			theme="colored"
		/>
	);
};
