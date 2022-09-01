import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Trash } from 'phosphor-react';

import { Spinner } from 'components/Elements';
import { useDeleteWorkoutMutation } from 'features/workout/store';
import { Confirm } from './Confirm/Confirm';

import styles from './Card.module.css';

export const Card = ({ title }) => {
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);
	const [deleteWorkout, { isLoading }] = useDeleteWorkoutMutation();

	const handleNavigate = () => navigate(title);

	const handleDeleteClick = async (e) => {
		e.stopPropagation();
		setOpen(true);
	};

	const onDeleteClick = async () => {
		try {
			await deleteWorkout(title).unwrap();
			toast.success(`${title} deleted`);
		} catch (error) {
			toast.success(error);
		}
	};
	return (
		<div className={styles.template} onClick={handleNavigate}>
			<div className={styles.templateContainer}>
				<button onClick={handleDeleteClick} disabled={isLoading}>
					{isLoading ? <Spinner /> : <Trash size={20} weight="bold" />}
				</button>
				<div className={styles.templateInfo}>
					<h5>{title}</h5>
				</div>
			</div>
			{open && <Confirm title={title} close={setOpen} onDeleteClick={onDeleteClick} />}
		</div>
	);
};
