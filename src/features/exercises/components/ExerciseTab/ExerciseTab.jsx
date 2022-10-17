import { useSelector } from 'react-redux';
import { defaultTabs, selectExerciseId } from 'features/exercises';
import { useMediaQuery } from 'hooks/useMediaQuery ';

import { TabList, Tab, TabPanel } from 'components/Elements';
import { ExerciseList } from '../ExerciseList/ExerciseList';
import { ExercisePreview } from '../Preview/ExercisePreview';

import styles from './ExerciseTab.module.css';
export const ExerciseTab = ({ tabs = defaultTabs }) => {
	const matches = useMediaQuery(900);

	const id = useSelector(selectExerciseId);
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
				{!matches && <ExercisePreview id={id} />}
			</div>
		</div>
	);
};
