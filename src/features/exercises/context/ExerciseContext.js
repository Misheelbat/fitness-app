import { createContext, useContext, useState } from 'react';
import { initialTab } from 'features/exercises';

// create exercise context
const ExerciseContext = createContext();

// hook for exercise context
export const useExercise = () => {
	return useContext(ExerciseContext);
};

export const ExerciseProvider = ({ children }) => {
	const [activeTab, setActiveTab] = useState(initialTab);

	const value = { activeTab, setActiveTab };

	return (
		<ExerciseContext.Provider value={value}>
			{children}
		</ExerciseContext.Provider>
	);
};
