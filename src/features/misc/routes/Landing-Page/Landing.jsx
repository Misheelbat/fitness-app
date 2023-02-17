import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { selectDisplayName } from 'features/auth';
import { Head } from 'components/Head';
import { Button } from 'components/Elements';

import styles from './Landing.module.css';

export const Landing = () => {
	const navigate = useNavigate();
	const user = useSelector(selectDisplayName);

	const handleStart = () => {
		if (user) {
			navigate('/app');
		} else {
			navigate('/auth/login');
		}
	};
	return (
		<>
			<Head />
			<main className={styles.landing}>
				<h1>Welcome</h1>
				<Button onClick={handleStart}>Get Started</Button>
			</main>
		</>
	);
};
