import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useAuth } from 'features/auth';
import { Button, BUTTON_TYPES } from 'components/Elements';
import { transformErrMSg } from 'utils';

import styles from './ForgotPassForm.module.css';

export const ForgotPassForm = () => {
	const { resetPassword } = useAuth();
	const [email, setEmail] = useState('');
	const [isLoading, setIsLoading] = useState('');

	const handleFormInput = (e) => {
		setEmail(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			setIsLoading(true);
			await resetPassword(email);
			toast.success('Check your Email for further Instructions');
		} catch (error) {
			toast.error(transformErrMSg(error.message));
		}
		setIsLoading(false);
	};

	return (
		<form onSubmit={handleSubmit} className={styles.loginForm}>
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
			<div className={styles.btnGroup}>
				<Button isLoading={isLoading} buttonType={BUTTON_TYPES.max}>
					Reset Password
				</Button>
			</div>
			<Link className={styles.backBtn} to="../login">
				Login
			</Link>
			<div className={styles.register}>
				<div>
					<span>Not registered yet? </span>
					<Link to="../register">Register</Link>
				</div>
			</div>
		</form>
	);
};
