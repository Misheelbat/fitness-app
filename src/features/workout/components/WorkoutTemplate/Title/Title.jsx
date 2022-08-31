import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FloppyDisk } from 'phosphor-react';

import { Spinner } from 'components/Elements';
import { useUpdateWorkoutTitleMutation } from 'features/workout/store';

import styles from './Title.module.css';
export const Title = ({ data, title, setTitle }) => {
	const navigate = useNavigate();
	const [updateTitle, { isSuccess, isLoading }] = useUpdateWorkoutTitleMutation();

	useEffect(() => {
		if (isSuccess) {
			navigate(`../`);
		}
	}, [isSuccess, navigate]);

	const onTitleChanged = (e) => setTitle(e.target.value);
	const canUpdate = [data.id, title, data.id !== title].every(Boolean);

	const handleTitleSubmit = async (e) => {
		e.preventDefault();
		if (canUpdate) {
			await updateTitle({ id: data.id, data: { ...data, id: title } });
		}
	};

	return (
		<div className={styles.titleForm}>
			<form onSubmit={handleTitleSubmit}>
				<input required value={title} type="text" name="workoutTitle" id="workoutTitle" onChange={onTitleChanged} />
				<button type="submit" disabled={!canUpdate}>
					{isLoading ? <Spinner variant="secondary" /> : <FloppyDisk size={25} className={styles.saveIcon} />}
				</button>
			</form>
		</div>
	);
};
