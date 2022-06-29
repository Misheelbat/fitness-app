import { Link } from 'react-router-dom';

import { Head } from 'components/Head';

export const Landing = () => {
	return (
		<>
			<Head />
			<div>Landing</div>
			<Link to="/auth/login">login</Link>
		</>
	);
};
