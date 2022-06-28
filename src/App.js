import { useEffect } from 'react';

import { AppProvider } from 'providers/app';
import { AppRoutes } from 'routes';

import './App.css';
import { createUserFromAuth, onAuthStateListener } from 'utils';

function App() {
	useEffect(() => {
		const unsub = onAuthStateListener((user) => {
			if (user) {
				createUserFromAuth(user);
			}
		});
		return unsub;
	});
	return (
		<AppProvider className="App">
			<AppRoutes />
		</AppProvider>
	);
}

export default App;
