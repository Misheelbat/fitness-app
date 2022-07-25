import { createImagesUrl } from 'features/exercises';

import styles from './MuscleDiagram.module.css';

export const MuscleDiagram = ({ primary = [], secondary = [] }) => {
	const m = createImagesUrl(primary, secondary);
	const styleFront = {
		backgroundImage: m.front.join(','),
	};
	const styleBack = {
		backgroundImage: m.back.join(','),
	};
	return (
		<div className={styles.muscleDiagram}>
			<h4>MuscleDiagram</h4>
			<div className={styles.diagramContainer}>
				<div className={styles.diagram} style={styleFront} />
				<div className={styles.diagram} style={styleBack} />
			</div>
		</div>
	);
};
