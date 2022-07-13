import { useExercise } from 'features/exercises';
import { makeId } from 'utils';

import styles from './TabPanel.module.css';

export const TabPanel = ({ ...props }) => {
	const { activeTab } = useExercise();

	const tabId = makeId('tabId', activeTab);
	const panelId = makeId('panelId', activeTab);

	return (
		<div
			id={panelId}
			aria-labelledby={tabId}
			tabIndex="0"
			className={styles.tabPanel}
			{...props}
		>
			TabPanel
		</div>
	);
};
