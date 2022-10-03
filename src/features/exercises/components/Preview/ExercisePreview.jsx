import { useSelector } from 'react-redux';

import { selectExerciseId, useGetExerciseDetailsQuery } from 'features/exercises';

import { Tags } from './Tags/Tags';
import { Spinner, Button } from 'components/Elements';
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
				<section className={styles.title}>
					<h3>{data.name}</h3>
					<Button buttonType="add" />
				</section>

				<div className={styles.category}>
					<div className={styles.categoryEquipment}>
						<p>Equipments:</p>
						<Tags tags={data.equipment} />
					</div>
					<div>
						<p>Category:</p>
						<Tags tag={data.category.name} />
					</div>
				</div>

				{data.images.length !== 0 && (
					<section className={styles.illustration}>
						<h4>Illustrations:</h4>
						<div className={styles.images}>
							{data.images.map((img) => (
								<img key={img.id} src={img.image} alt="exercise" />
							))}
						</div>
					</section>
				)}

				<section className={styles.description}>
					<h4>Description:</h4>
					<div dangerouslySetInnerHTML={{ __html: data.description }}></div>
				</section>

				<MuscleDiagram primary={data.muscles} secondary={data.muscles_secondary} />
			</div>
		)
	);
};

//variations
