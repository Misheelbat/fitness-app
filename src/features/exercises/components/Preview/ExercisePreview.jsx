import { useSelector } from 'react-redux';

import {
	selectExerciseId,
	useGetSingleExerciseQuery,
} from 'features/exercises';
import styles from './Preview.module.css';

export const ExercisePreview = () => {
	const id = useSelector(selectExerciseId);
	const data = useGetSingleExerciseQuery(id, { skip: id === null });
	return <div className={styles.preview}>Preview</div>;
};

//category
//equipment
//muscles -  secondaryMuscles
//name
//variations
//description
//images