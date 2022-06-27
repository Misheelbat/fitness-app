import { Link } from 'react-router-dom';

import { Button } from 'components/Elements/Button/Button';
import { BUTTON_TYPES } from 'components/Elements/Button/Button';

import styles from './RegisterForm.module.css';
export const RegisterForm = () => {
	return (
		<form className={styles.registerForm}>
			<label htmlFor="name">
				<span>Name</span>
				<input type="text" name="name" placeholder="Enter your Name" />
			</label>
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
				<span>Already have an Account? </span>
				<Link to="../login">Login</Link>
			</div>
		</form>
	);
};
