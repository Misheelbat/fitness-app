import styles from './MuscleDiagram.module.css';

export const MuscleDiagram = ({ primary = [], secondary = [] }) => {
	return (
		<div className={styles.diagram}>
			MuscleDiagram
			<img src="/images/muscles/muscular_system_front.svg" alt="d" />
		</div>
	);
};
