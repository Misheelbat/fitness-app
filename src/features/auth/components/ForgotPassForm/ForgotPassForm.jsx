import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useLazyResetPasswordQuery } from 'features/auth';
import { transformErrMSg } from 'utils';

import { Button, BUTTON_TYPES } from 'components/Elements';

import styles from './ForgotPassForm.module.css';

export const ForgotPassForm = () => {
	const [resetPassword, { isLoading }] = useLazyResetPasswordQuery();
	const [email, setEmail] = useState('');

	const handleFormInput = (e) => {
		setEmail(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await resetPassword(email).unwrap();
			toast.success('Check your Email for further Instructions');
		} catch (error) {
			toast.error(transformErrMSg(error));
		}
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
