import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import { useDeleteWorkoutMutation } from 'features/workout/store';

import { Trash } from 'phosphor-react';
import { Spinner } from 'components/Elements';
import { ConfirmDelete } from './Confirm/ConfirmDelete';

import styles from './Card.module.css';

export const Card = ({ cardName }) => {
	const navigate = useNavigate();

	const [open, setOpen] = useState(false);
	const [deleteWorkout, { isLoading }] = useDeleteWorkoutMutation();

	const handleNavigate = () => navigate(cardName);

	const onDeleteBtnClick = (e) => {
		e.stopPropagation();
		setOpen(true);
	};

	const deleteCardFn = async () => {
		try {
			await deleteWorkout(cardName).unwrap();
			toast.success(`${cardName} deleted`, { toastId: cardName });
		} catch (error) {
			toast.success(error);
		}
	};

	return (
		<div className={styles.template} onClick={handleNavigate}>
			<div className={styles.templateContainer}>
				<button onClick={onDeleteBtnClick} disabled={isLoading}>
					{isLoading ? <Spinner /> : <Trash size={20} weight="bold" />}
				</button>

				<div className={styles.templateInfo}>
					<h5>{cardName}</h5>
				</div>
			</div>

			{open && (
				<ConfirmDelete
					title={cardName}
					close={setOpen}
					onDeleteClick={deleteCardFn}
				/>
			)}
		</div>
	);
};
