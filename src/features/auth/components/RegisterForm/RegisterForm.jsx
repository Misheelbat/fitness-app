import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { transformErrMSg } from 'utils';
import { useRegisterMutation } from 'features/auth';
import { Button, BUTTON_TYPES } from 'components/Elements';

import styles from './RegisterForm.module.css';

const defaultFormFields = {
	displayName: '',
	email: '',
	password: '',
	confirmPassword: '',
};

export const RegisterForm = ({ onSuccess }) => {
	const [register, { isLoading }] = useRegisterMutation();
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { displayName, email, password, confirmPassword } = formFields;

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await register(formFields).unwrap();
			toast.success('Welcome');
			onSuccess();
		} catch (error) {
			toast.error(transformErrMSg(error));
		}
	};

	const handleFormInput = (e) => {
		const { name, value } = e.target;
		setFormFields({ ...formFields, [name]: value });
	};
	return (
		<form onSubmit={handleSubmit} className={styles.registerForm}>
			<div className={styles.registerInput}>
				<label htmlFor="displayName">Display Name</label>
				<input
					required
					value={displayName}
					onChange={handleFormInput}
					type="text"
					name="displayName"
					id="displayName"
					placeholder="Enter Name"
				/>
			</div>
			<div className={styles.registerInput}>
				<label htmlFor="email">Email Address</label>
				<input
					required
					value={email}
					onChange={handleFormInput}
					type="email"
					name="email"
					id="email"
					placeholder="Enter Email"
				/>
			</div>
			<div className={styles.registerInput}>
				<label htmlFor="password">Password</label>
				<input
					required
					value={password}
					onChange={handleFormInput}
					type="password"
					name="password"
					id="password"
					placeholder="Enter Password"
				/>
			</div>
			<div className={styles.registerInput}>
				<label htmlFor="confirmPassword">Confirm Password</label>
				<input
					required
					value={confirmPassword}
					onChange={handleFormInput}
					type="password"
					name="confirmPassword"
					id="confirmPassword"
					placeholder="confirm Password"
				/>
			</div>
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
