import { Link } from 'react-router-dom';
import { Button } from 'components/Elements';
import { BUTTON_TYPES } from 'components/Elements';

import styles from './LoginForm.module.css';
export const LoginForm = () => {
	return (
		<form className={styles.loginForm}>
			<label htmlFor="email">
				<span>Email Address</span>
				<input type="email" name="email" placeholder="Enter your Email" />
			</label>
			<label htmlFor="password">
				<span>Password</span>
				<input
					type="password"
					name="password"
					placeholder="Enter your Password"
				/>
			</label>
			<div className={styles.btnGroup}>
				<Button>Log in</Button>
				<Button buttonType={BUTTON_TYPES.google}>Google</Button>
			</div>
			<div className={styles.register}>
				<span>Not registered yet? </span>
				<Link to="../register">Register</Link>
			</div>
		</form>
	);
};
