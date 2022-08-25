import { useNavigate } from 'react-router-dom';
import styles from './Template.module.css';

export const Template = ({ title }) => {
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
