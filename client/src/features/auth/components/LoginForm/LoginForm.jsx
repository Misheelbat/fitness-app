import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useLoginMutation } from 'features/auth';
import { transformErrMSg } from 'utils';

import { Button, BUTTON_TYPES } from 'components/Elements';
import { LoginGuest } from '../LoginGuest/LoginGuest';

import styles from './LoginForm.module.css';

const defaultFormFields = {
	email: '',
	password: '',
};

export const LoginForm = ({ onSuccess }) => {
	const [login, { isLoading }] = useLoginMutation();
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { email, password } = formFields;

	const handleFormInput = (e) => {
		const { name, value } = e.target;
		setFormFields({ ...formFields, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await login(formFields).unwrap();
			toast.success('Welcome');
			onSuccess();
		} catch (error) {
			toast.error(transformErrMSg(error));
		}
	};

	return (
		<>
			<form onSubmit={handleSubmit} className={styles.loginForm}>
				<div className={styles.loginInput}>
					<label htmlFor="email">Email Address</label>
					<input
						required
						onChange={handleFormInput}
						value={email}
						type="email"
						name="email"
						id="email"
						placeholder="Enter your Email"
					/>
				</div>
				<div className={styles.loginInput}>
					<label htmlFor="password">Password</label>
					<input
						required
						onChange={handleFormInput}
						value={password}
						type="password"
						name="password"
						id="password"
						placeholder="Enter your Password"
					/>
				</div>
				<div className={styles.btnGroup}>
					<Button
						type="submit"
						isLoading={isLoading}
						buttonType={BUTTON_TYPES.max}
					>
						Log in
					</Button>
				</div>
			</form>
			<LoginGuest onSuccess={onSuccess} />
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
		</>
	);
};
