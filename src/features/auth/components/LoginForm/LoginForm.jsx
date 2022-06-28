import { useState } from 'react';
import { Link } from 'react-router-dom';

import { loginAuthUserWithEmailAndPassword } from 'features/auth/api/login';
import { signWithGooglePopup } from 'utils';
import { Button } from 'components/Elements';
import { BUTTON_TYPES } from 'components/Elements';

import styles from './LoginForm.module.css';
import { async } from '@firebase/util';

const defaultFormFields = {
	email: '',
	password: '',
};

export const LoginForm = () => {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { email, password } = formFields;

	const handleFormInput = (e) => {
		const { name, value } = e.target;
		setFormFields({ ...formFields, [name]: value });
	};
	
	const loginWithGoogle = async () => {
		await signWithGooglePopup();
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		await loginAuthUserWithEmailAndPassword(formFields);
		setFormFields(defaultFormFields);
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
				<Button type="submit">Log in</Button>
				<Button onClick={loginWithGoogle} buttonType={BUTTON_TYPES.google}>
					Login with Google
				</Button>
			</div>
			<div className={styles.register}>
				<span>Not registered yet? </span>
				<Link to="../register">Register</Link>
			</div>
		</form>
	);
};
