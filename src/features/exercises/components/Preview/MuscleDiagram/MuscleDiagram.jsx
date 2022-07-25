import { createImagesUrl } from 'features/exercises';

import { Tags } from '../Tags/Tags';
import styles from './MuscleDiagram.module.css';

export const MuscleDiagram = ({ primary = [], secondary = [] }) => {
	const { front, back } = createImagesUrl(primary, secondary);
	const styleFront = {
		backgroundImage: front.join(','),
	};
	const styleBack = {
		backgroundImage: back.join(','),
	};
	return (
		<section className={styles.muscleDiagram}>
			<h4>Muscles</h4>
			<div className={styles.muscles}>
				<div className={styles.primary}>
					<p>Primary Muscles:</p>
					<Tags tags={primary} />
				</div>
				<div className={styles.secondary}>
					<p>Secondary Muscles:</p>
					<Tags tags={secondary} />
				</div>
			</div>
			<div className={styles.diagramContainer}>
				{front.length > 1 && (
					<div className={styles.diagram} style={styleFront} />
				)}
				{back.length > 1 && (
					<div className={styles.diagram} style={styleBack} />
				)}
			</div>
		</section>
	);
};
