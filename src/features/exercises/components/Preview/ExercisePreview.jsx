import { useSelector } from 'react-redux';

import {
	selectExerciseId,
	useGetExerciseDetailsQuery,
} from 'features/exercises';

import { Tags } from './Tags/Tags';
import { Spinner } from 'components/Elements';
import { MuscleDiagram } from './MuscleDiagram/MuscleDiagram';
import styles from './Preview.module.css';

export const ExercisePreview = () => {
	const id = useSelector(selectExerciseId);
	const { data, isFetching } = useGetExerciseDetailsQuery(id, {
		skip: id === null,
	});

	if (isFetching) {
		return (
			<div className={styles.loading}>
				<Spinner variant="secondary" size="60" />
			</div>
		);
	}

	return (
		data && (
			<div className={styles.preview}>
				<div className={styles.title}>
					<h3>{data.name}</h3>
				</div>

				<div>
					<Tags tags={data.equipment} />
				</div>

				<div className={styles.description}>
					<h4>Description:</h4>
					<div dangerouslySetInnerHTML={{ __html: data.description }}></div>
				</div>

				<div className={styles.illustration}>
					<h4>Illustration:</h4>
					<div className={styles.images}>
						{data.images.map((img) => (
							<img key={img.id} src={img.image} alt="exercise" />
						))}
					</div>
					<MuscleDiagram />
				</div>
			</div>
		)
	);
};

//category
//equipment
//muscles -  secondaryMuscles
//name
//variations
//description
//images
