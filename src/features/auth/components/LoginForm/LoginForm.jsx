import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from 'features/auth';
import { Button } from 'components/Elements';
import { BUTTON_TYPES } from 'components/Elements';
import { tranformErrMSg } from 'utils';

import styles from './LoginForm.module.css';

const defaultFormFields = {
	email: '',
	password: '',
};

export const LoginForm = ({ onSuccess }) => {
	const { login } = useAuth();
	const [formFields, setFormFields] = useState(defaultFormFields);
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const { email, password } = formFields;

	const handleFormInput = (e) => {
		const { name, value } = e.target;
		setFormFields({ ...formFields, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			setError('');
			setIsLoading(true);
			await login(formFields);
			onSuccess();
		} catch (error) {
			setError(tranformErrMSg(error.message));
		}

		setIsLoading(false);
	};

	return (
		<form onSubmit={handleSubmit} className={styles.loginForm}>
			{error && <span>{error}</span>}
			<label htmlFor="email">
				<span>Email Address</span>
				<input
					required
					onChange={handleFormInput}
					value={email}
					type="email"
					name="email"
					placeholder="Enter your Email"
				/>
			</label>
			<label htmlFor="password">
				<span>Password</span>
				<input
					required
					onChange={handleFormInput}
					value={password}
					type="password"
					name="password"
					placeholder="Enter your Password"
				/>
			</label>
			<div className={styles.btnGroup}>
				<Button isLoading={isLoading} buttonType={BUTTON_TYPES.max}>
					Log in
				</Button>
			</div>
			<div className={styles.register}>
				<div>
					<span>Forgot password? </span>
					<Link to="../forgotPassword">Reset</Link>
				</div>
				<div>
					<span>Not registered yet? </span>
					<Link to="../register">Register</Link>
				</div>
			</div>
		</form>
	);
};
