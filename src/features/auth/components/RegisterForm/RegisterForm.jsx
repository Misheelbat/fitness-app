import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Button } from 'components/Elements';
import { BUTTON_TYPES } from 'components/Elements';
import { useAuth } from 'features/auth';

import styles from './RegisterForm.module.css';

const defaultFormFields = {
	displayName: '',
	email: '',
	password: '',
	confirmPassword: '',
};

export const RegisterForm = ({ onSuccess }) => {
	const { register, setCurrentUser } = useAuth();
	const [formFields, setFormFields] = useState(defaultFormFields);
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const { displayName, email, password, confirmPassword } = formFields;

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			setError('');
			setIsLoading(true);
			await register(formFields);
			setCurrentUser({ displayName, email });
			onSuccess();
		} catch (error) {
			console.log(error);
			setError(error.message);
		}
		setIsLoading(false);
	};

	const handleFormInput = (e) => {
		const { name, value } = e.target;
		setFormFields({ ...formFields, [name]: value });
	};
	return (
		<form onSubmit={handleSubmit} className={styles.registerForm}>
			{error && <span>{error}</span>}
			<label htmlFor="displayName">
				<span>Display Name</span>
				<input
					required
					value={displayName}
					onChange={handleFormInput}
					type="text"
					name="displayName"
					placeholder="Enter Name"
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
					placeholder="Enter Email"
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
					placeholder="Enter Password"
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
					placeholder="confirm Password"
				/>
			</label>
			<div className={styles.btnGroup}>
				<Button
					isLoading={isLoading}
					type="submit"
					buttonType={BUTTON_TYPES.max}
				>
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
