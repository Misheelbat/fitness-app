import { createImagesUrl } from 'features/exercises';

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
		<div className={styles.muscleDiagram}>
			<h4>MuscleDiagram</h4>
			<div className={styles.diagramContainer}>
				{front.length > 1 && (
					<div className={styles.diagram} style={styleFront} />
				)}
				{back.length > 1 && (
					<div className={styles.diagram} style={styleBack} />
				)}
			</div>
		</div>
	);
};
