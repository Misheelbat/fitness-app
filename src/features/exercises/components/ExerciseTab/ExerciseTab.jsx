import { defaultTabs } from 'features/exercises';

import { TabList, Tab, TabPanel } from 'components/Elements';
import { ExerciseList } from '../ExerciseList/ExerciseList';
import { ExercisePreview } from '../Preview/ExercisePreview';

import styles from './ExerciseTab.module.css';

export const ExerciseTab = ({ tabs = defaultTabs }) => {
	return (
		<div className={styles.tabs}>
			<TabList aria-label="Exercises categories">
				{tabs.map((tab) => (
					<Tab tab={tab} key={tab.id}>
						{tab.name}
					</Tab>
				))}
			</TabList>
			<div className={styles.tabsPanel}>
				<TabPanel>
					<ExerciseList />
				</TabPanel>
				<ExercisePreview />
			</div>
		</div>
	);
};
