import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Button } from 'components/Elements';
import { useAuth } from 'lib';

import styles from './RegisterForm.module.css';

const defaultFormFields = {
	displayName: '',
	email: '',
	password: '',
	confirmPassword: '',
};

export const RegisterForm = ({ onSuccess }) => {
	const { register, isRegistering } = useAuth();
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { displayName, email, password, confirmPassword } = formFields;

	const handleSubmit = async (e) => {
		e.preventDefault();
		await register(formFields);
		onSuccess();
	};

	const handleFormInput = (e) => {
		const { name, value } = e.target;
		setFormFields({ ...formFields, [name]: value });
	};
	return (
		<form onSubmit={handleSubmit} className={styles.registerForm}>
			<label htmlFor="displayName">
				<span>Display Name</span>
				<input
					required
					value={displayName}
					onChange={handleFormInput}
					type="text"
					name="displayName"
					placeholder="Enter your Name"
				/>
			</label>
			<label htmlFor="email">
				<span>Email Address</span>
				<input
					required
					value={email}
					onChange={handleFormInput}
					type="email"
					name="email"
					placeholder="Enter your Email"
				/>
			</label>
			<label htmlFor="password">
				<span>Password</span>
				<input
					required
					value={password}
					onChange={handleFormInput}
					type="password"
					name="password"
					placeholder="Enter your Password"
				/>
			</label>
			<label htmlFor="confirmPassword">
				<span>Confirm Password</span>
				<input
					required
					value={confirmPassword}
					onChange={handleFormInput}
					type="password"
					name="confirmPassword"
					placeholder="confirm Passowrd"
				/>
			</label>
			<div className={styles.btnGroup}>
				<Button isLoading={isRegistering} type="submit">
					Register
				</Button>
			</div>
			<div className={styles.register}>
				<span>Already have an Account? </span>
				<Link to="../login">Login</Link>
			</div>
		</form>
	);
};
