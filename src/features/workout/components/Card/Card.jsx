import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDeleteWorkoutMutation } from 'features/workout/store';

import { Trash } from 'phosphor-react';
import { Confirm } from './Confirm/Confirm';
import { Spinner } from 'components/Elements';
import { toast } from 'react-toastify';

import styles from './Card.module.css';

export const Card = ({ cardName }) => {
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);
	const [deleteWorkout, { isLoading }] = useDeleteWorkoutMutation();

	const handleNavigate = () => navigate(cardName);

	const openConfirmModal = (e) => {
		e.stopPropagation();
		setOpen(true);
	};

	const onDeleteClick = async () => {
		try {
			await deleteWorkout(cardName).unwrap();
			toast.success(`${cardName} deleted`);
		} catch (error) {
			toast.success(error);
		}
	};
	return (
		<div className={styles.template} onClick={handleNavigate}>
			<div className={styles.templateContainer}>
				<button onClick={openConfirmModal} disabled={isLoading}>
					{isLoading ? <Spinner /> : <Trash size={20} weight="bold" />}
				</button>
				<div className={styles.templateInfo}>
					<h5>{cardName}</h5>
				</div>
			</div>
			{open && <Confirm title={cardName} close={setOpen} onDeleteClick={onDeleteClick} />}
		</div>
	);
};
