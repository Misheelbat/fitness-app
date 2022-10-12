import { Button } from 'components/Elements';

import styles from './ErrorFallBack.module.css';

export const ErrorFallBack = () => {
	const refreshPage = () => {
		window.location.reload(false);
	};
	return (
		<div className={styles.errorFallBack}>
			<h2>Oops, something went wrong :( </h2>
			<Button onClick={refreshPage}>Refresh</Button>
		</div>
	);
};
