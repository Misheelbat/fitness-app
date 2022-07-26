import { Routes, Route } from 'react-router-dom';

import { CreateTemplate } from './CreateTemplate/CreateTemplate';
import { Programm } from './Programm/Programm';
import { Programms } from './Programms/Programms';

export const ProgrammRoutes = () => {
	return (
		<Routes>
			<Route path="" element={<Programms />} />
			<Route path=":programmId" element={<Programm />} />
			<Route path="createTemplate" element={<CreateTemplate />} />
		</Routes>
	);
};
