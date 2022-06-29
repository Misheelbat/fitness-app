import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Button } from 'components/Elements';
import { useAuth } from 'lib';

import styles from './LoginForm.module.css';

const defaultFormFields = {
	email: '',
	password: '',
};

export const LoginForm = ({ onSuccess }) => {
	const { login, isLoggingIn } = useAuth();
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { email, password } = formFields;

	const handleFormInput = (e) => {
		const { name, value } = e.target;
		setFormFields({ ...formFields, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		await login(formFields);
		setFormFields(defaultFormFields);
		onSuccess();
	};

	return (
		<form onSubmit={handleSubmit} className={styles.loginForm}>
			<label htmlFor="email">
				<span>Email Address</span>
				<input
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
					onChange={handleFormInput}
					value={password}
					type="password"
					name="password"
					placeholder="Enter your Password"
				/>
			</label>
			<div className={styles.btnGroup}>
				<Button type="submit" isLoading={isLoggingIn}>
					Log in
				</Button>
			</div>
			<div className={styles.register}>
				<span>Not registered yet? </span>
				<Link to="../register">Register</Link>
			</div>
		</form>
	);
};
