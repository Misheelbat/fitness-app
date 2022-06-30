import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from 'features/auth';
import { Button } from 'components/Elements';
import { BUTTON_TYPES } from 'components/Elements';
import { tranformErrMSg } from 'utils';

import styles from './ForgotPassForm.module.css';

export const ForgotPassForm = ({ onSuccess }) => {
	const { resetPassword } = useAuth();
	const [email, setEmail] = useState('');
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState('');

	const handleFormInput = (e) => {
		setEmail(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			setError('');
			setIsLoading(true);
			await resetPassword(email);
			// onSuccess();
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
