import { createContext, useContext, useState } from 'react';

const ExerciseContext = createContext();

export const useExercise = () => {
	return useContext(ExerciseContext);
};

export const ExerciseProvider = ({ children }) => {
	const [activeTab, setActiveTab] = useState('tabsId-1');
	
	const value = { activeTab, setActiveTab };
	return (
		<ExerciseContext.Provider value={value}>
			{children}
		</ExerciseContext.Provider>
	);
};
