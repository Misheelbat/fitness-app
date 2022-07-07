import { TabList, Tab } from 'components/Elements/Tabs';

import styles from './ExerciseTab.module.css';

const defaultTabs = ['Muscle', 'Equipment', 'Category'];

export const ExerciseTab = ({ tabs = defaultTabs }) => {
	return (
		<TabList aria-label="Exercises categories" className={styles.tab}>
			{tabs.map((tab, i) => (
				<Tab
					aria-controls={'panel-' + (i + 1)}
					buttonId={'tabsId-' + (i + 1)}
					key={tab}
				>
					{tab}
				</Tab>
			))}
		</TabList>
	);
};


// each panel must have id same as tab aria-controlls
// panel must have aria-labbeledby prop to associate with and element
// panel have tabIndex 0 if is active otherwhise -1
