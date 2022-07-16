import cx from 'classnames';
import { useSelector, useDispatch } from 'react-redux';

import { selectTab, setCategory } from 'features/exercises';
import { makeId } from 'utils';

import styles from './Tab.module.css';

export const Tab = ({ Element = 'button', tab, children, ...props }) => {
	const dispatch = useDispatch();
	const activeTab = useSelector(selectTab);

	const panelId = makeId('panelId', tab.id);
	const tabId = makeId('tabId', tab.id);

	const handleClick = () => {
		dispatch(setCategory(tab));
	};

	const isActive = activeTab.id === tab.id;
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
