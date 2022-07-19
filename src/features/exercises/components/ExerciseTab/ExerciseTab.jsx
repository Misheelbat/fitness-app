import { TabList, Tab, TabPanel } from 'components/Elements';
import { defaultTabs } from 'features/exercises';
import { ExerciseList } from '../ExerciseList/ExerciseList';

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

			<TabPanel>
				<ExerciseList />
			</TabPanel>
		</div>
	);
};
