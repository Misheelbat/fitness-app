import cx from 'classnames';

import { makeId } from 'utils';

import styles from './Tab.module.css';

export const Tab = ({
	Element = 'button',
	setActiveTab,
	activeTab,
	value,
	children,
	...props
}) => {
	const panelId = makeId('panelId', value);
	const tabId = makeId('tabId', value);

	const handleClick = () => {
		setActiveTab(value);
	};

	const isActive = activeTab === value;
	return (
		<Element
			id={tabId}
			role="tab"
			onClick={handleClick}
			aria-controls={panelId}
			aria-selected={isActive}
			tabIndex={isActive ? '0' : '-1'}
			className={cx(styles.tab, isActive ? styles.activeTab : '')}
			{...props}
		>
			{children}
		</Element>
	);
};
