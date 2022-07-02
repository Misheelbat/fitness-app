import { AppProvider } from 'providers/app';
import { AppRoutes } from 'routes';

import './App.css';

function App() {
	return (
		<AppProvider className="App">
			<AppRoutes />
		</AppProvider>
	);
}

export default App;
