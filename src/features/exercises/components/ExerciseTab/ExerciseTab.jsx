import { useSelector } from 'react-redux';
import { selectExerciseId } from 'features/exercises';
import { useMediaQuery } from 'hooks/useMediaQuery ';

import { TabList, Tab, TabPanel } from 'components/Elements';
import { ExerciseList } from '../ExerciseList/ExerciseList';
import { ExercisePreview } from '../Preview/ExercisePreview';

import styles from './ExerciseTab.module.css';

const defaultTabs = [
	{ name: 'Muscles', id: 1, url: 'muscle' },
	{ name: 'Equipment', id: 2, url: 'equipment' },
	{ name: 'Category', id: 3, url: 'exercisecategory' },
];

export const ExerciseTab = ({ tabs = defaultTabs }) => {
	const isMobileWidth = useMediaQuery(900);

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
				{!isMobileWidth && <ExercisePreview id={id} />}
			</div>
		</div>
	);
};
