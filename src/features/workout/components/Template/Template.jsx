import { useNavigate } from 'react-router-dom';
import styles from './Template.module.css';

export const Template = ({ id = '1' }) => {
	const navigate = useNavigate();
	const handleClick = () => {
		navigate(id);
	};
	return (
		<div className={styles.template} onClick={handleClick}>
			<div className={styles.templateInfo}>
				<h5>Core Blast</h5>
			</div>
		</div>
	);
};
