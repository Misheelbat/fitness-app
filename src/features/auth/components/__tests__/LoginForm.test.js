import {
	customRender,
	screen,
	waitFor,
	userEvent,
	createNewUser,
	clearUserDb,
	act,
} from 'test/test-utils';
import { userDataGenerator } from 'test/data-generators';

import { LoginForm } from '../LoginForm/LoginForm';

describe('login features', () => {
	beforeAll(async () => {
		await clearUserDb();
		await createNewUser();
	});

	afterAll(async () => {
		await clearUserDb();
	});

	const user = userDataGenerator();
	test('if login is successful, onSuccess callback is called which redirects the user', async () => {
		const onSuccess = jest.fn();
		await customRender(<LoginForm onSuccess={onSuccess} />);

		userEvent.type(screen.getByLabelText(/Email address/i), user.email);
		userEvent.type(screen.getByLabelText(/Password/i), user.password);

		userEvent.click(screen.getByRole('button', { name: /Log in/i }));

		await waitFor(() => expect(onSuccess).toHaveBeenCalledTimes(1));
	});

	test('login with wrong password displays the correct error message', async () => {
		const wrongPassword = '654321';

		const onSuccess = jest.fn();
		await customRender(<LoginForm onSuccess={onSuccess} />);

		userEvent.type(screen.getByLabelText(/Email address/i), user.email);
		userEvent.type(screen.getByLabelText(/Password/i), wrongPassword);

		userEvent.click(screen.getByRole('button', { name: /Log in/i }));

		// const errorMsg = screen.findByText('wrong-password');
		await waitFor(() =>
			expect(screen.findByText('wrong-password')).toBeDefined()
		);
	});

	test('login with non-existing email displays the correct error message', async () => {
		const wrongEmail = 'wrong@email.com';

		const onSuccess = jest.fn();
		await customRender(<LoginForm onSuccess={onSuccess} />);

		userEvent.type(screen.getByLabelText(/Email address/i), wrongEmail);
		userEvent.type(screen.getByLabelText(/Password/i), user.password);
		userEvent.click(screen.getByRole('button', { name: /Log in/i }));

		// const errorMsg = screen.findByText(/^user-not-found$/i);
		await waitFor(() =>
			expect(screen.findByText(/^user-not-found$/i)).toBeDefined()
		);
	});
});
