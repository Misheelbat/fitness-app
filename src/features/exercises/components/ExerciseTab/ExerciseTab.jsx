import { useExercise } from 'features/exercises';

import { TabList, Tab, TabPanel } from 'components/Elements';
import { ExerciseList } from '../ExerciseList/ExerciseList';

import styles from './ExerciseTab.module.css';

const defaultTabs = ['Muscle', 'Equipment', 'Category'];

export const ExerciseTab = ({ tabs = defaultTabs }) => {
	const { activeTab, setActiveTab } = useExercise();

	return (
		<div className={styles.tabs}>
			<TabList aria-label="Exercises categories">
				{tabs.map((tab, i) => (
					<Tab
						activeTab={activeTab}
						setActiveTab={setActiveTab}
						value={i + 1}
						key={tab}
					>
						{tab}
					</Tab>
				))}
			</TabList>
			<TabPanel currentTab={activeTab}>
				<ExerciseList />
			</TabPanel>
		</div>
	);
};

