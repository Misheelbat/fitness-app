import { useNavigate } from 'react-router-dom';

import { useAuth } from 'features/auth';
import { Head } from 'components/Head';
import { Button } from 'components/Elements';

import styles from './Landing.module.css';

export const Landing = () => {
	const navigate = useNavigate();
	const { currentUser } = useAuth();

	const handleStart = () => {
		if (currentUser) {
			navigate('/app');
		} else {
			navigate('/auth/login');
		}
	};
	return (
		<>
			<Head />
			<main className={styles.landing}>
				<h1>Landing</h1>
				<Button onClick={handleStart}>Get Started</Button>
			</main>
		</>
	);
};
