import { useSelector } from 'react-redux/es/exports';
import { selectTab } from 'features/exercises';
import { makeId } from 'utils';

import styles from './TabPanel.module.css';

export const TabPanel = ({ Element = 'div', children, ...props }) => {
	const activeTab = useSelector(selectTab);

	const tabId = makeId('tabId', activeTab.id);
	const panelId = makeId('panelId', activeTab.id);

	return (
		<Element
			id={panelId}
			aria-labelledby={tabId}
			tabIndex="0"
			className={styles.tabPanel}
			{...props}
		>
			{children}
		</Element>
	);
};
