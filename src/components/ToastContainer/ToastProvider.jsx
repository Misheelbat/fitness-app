import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from './ToastProvider.module.css';
export const ToastProvider = () => {
	return (
		<ToastContainer
			className={styles.toastContainer}
			autoClose="1000"
			pauseOnHover="false"
			pauseOnFocusLoss="false"
			limit="1"
			theme="colored"
		/>
	);
};
