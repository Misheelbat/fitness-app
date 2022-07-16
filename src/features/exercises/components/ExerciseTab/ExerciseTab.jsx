import { useExercise } from 'features/exercises';

import { TabList, Tab, TabPanel } from 'components/Elements';
import { ExerciseList } from '../ExerciseList/ExerciseList';
import { defaultTabs } from 'features/exercises';

import styles from './ExerciseTab.module.css';

export const ExerciseTab = ({ tabs = defaultTabs }) => {
	const { activeTab, setActiveTab } = useExercise();

	return (
		<div className={styles.tabs}>
			<TabList aria-label="Exercises categories">
				{tabs.map((tab) => (
					<Tab
						activeTab={activeTab}
						setActiveTab={setActiveTab}
						tab={tab}
						key={tab.id}
					>
						{tab.category}
					</Tab>
				))}
			</TabList>

			<TabPanel currentTab={activeTab}>
				<ExerciseList />
			</TabPanel>
		</div>
	);
};
