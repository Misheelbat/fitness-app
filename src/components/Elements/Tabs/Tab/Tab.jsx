import cx from 'classnames';

import { useExercise } from 'features/exercises';
import { makeId } from 'utils';

import styles from './Tab.module.css';

export const Tab = ({ Element = 'button', value, children, ...props }) => {
	const { activeTab, setActiveTab } = useExercise();

	const panelId = makeId('panelId', value);
	const tabId = makeId('tabId', value);

	const isActive = activeTab === value;
	const handleClick = () => {
		setActiveTab(value);
	};
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
