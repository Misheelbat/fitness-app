import { makeId } from 'utils';

import styles from './TabPanel.module.css';

export const TabPanel = ({
	Element = 'div',
	currentTab,
	children,
	...props
}) => {
	const tabId = makeId('tabId', currentTab);
	const panelId = makeId('panelId', currentTab);

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
