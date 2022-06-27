import { Layout } from '../../components/Layout/Layout';
import { LoginForm } from '../../components/LoginForm/LoginForm';

export const Login = () => {
	return (
		<Layout title="Log into your account">
			<LoginForm />
		</Layout>
	);
};
