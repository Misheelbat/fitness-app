import styles from './CreateFormModal.module.css';
import { Button } from 'components/Elements';

export const CreateFormModal = ({ close }) => {
	return (
		<div className={styles.createFormContainer}>
			<div className={styles.createFormModal}>
				<button onClick={() => close(false)}>X</button>
				<form action="">
					<label htmlFor="title">Please Enter a title</label>
					<input type="text" name="title" id="title" />
					<Button type="submit" buttonType="max-width">
						Create
					</Button>
				</form>
			</div>
		</div>
	);
};
