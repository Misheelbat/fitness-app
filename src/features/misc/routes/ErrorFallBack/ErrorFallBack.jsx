import { Button } from 'components/Elements';

import styles from './ErrorFallBack.module.css';

export const ErrorFallBack = () => {
	return (
		<div className={styles.errorFallBack}>
			<h2>Oops, something went wrong :( </h2>
			<Button>Refresh</Button>
		</div>
	);
};
