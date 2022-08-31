import { useNavigate } from 'react-router-dom';
import styles from './Card.module.css';

export const Card = ({ title }) => {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate(title);
	};

	return (
		<div className={styles.template} onClick={handleClick}>
			<div className={styles.templateInfo}>
				<h5>{title}</h5>
			</div>
		</div>
	);
};