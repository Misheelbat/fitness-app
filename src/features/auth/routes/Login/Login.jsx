import { useNavigate } from 'react-router-dom';

import { Layout } from '../../components/Layout/Layout';
import { LoginForm } from '../../components/LoginForm/LoginForm';

export const Login = () => {
	const navigate = useNavigate();
	return (
		<Layout title="Log into your account">
			<LoginForm onSuccess={() => navigate('/app')} />
		</Layout>
	);
};
