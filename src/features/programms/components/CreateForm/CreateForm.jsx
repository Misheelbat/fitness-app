import { Button } from 'components/Elements';
import styles from './CreateForm.module.css';

export const CreateForm = () => {
	return (
		<div className={styles.createForm}>
			<h4>Workouts :</h4>
			<Button buttonType="add">ADD</Button>
		</div>
	);
};
