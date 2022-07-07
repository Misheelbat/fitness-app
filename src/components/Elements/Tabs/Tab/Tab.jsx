import cx from 'classnames';
import { useExercise } from 'features/exercises';

import styles from './Tab.module.css';
export const Tab = ({ Element = 'button', buttonId, children, ...props }) => {
	const { activeTab, setActiveTab } = useExercise();

	const handleClick = () => {
		setActiveTab(buttonId);
	};
	return (
		<Element
			onClick={handleClick}
			id={buttonId}
			role="tab"
			aria-selected={activeTab === buttonId ? true : false}
			tabIndex={activeTab === buttonId ? '0' : '-1'}
			{...props}
			className={cx(styles.tab, buttonId === activeTab ? styles.activeTab : '')}
		>
			{children}
		</Element>
	);
};
