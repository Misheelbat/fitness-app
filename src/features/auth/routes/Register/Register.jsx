import { useNavigate } from 'react-router-dom';
import { Layout } from '../../components/Layout/Layout';
import { RegisterForm } from '../../components/RegisterForm/RegisterForm';

export const Register = () => {
	const navigate = useNavigate();
	return (
		<Layout title="Register into your account">
			<RegisterForm onSuccess={() => navigate('/app')} />
		</Layout>
	);
};
