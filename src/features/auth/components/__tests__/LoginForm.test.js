import { customRender, screen, waitFor, userEvent } from 'test/test-utils';
import { LoginForm } from '../LoginForm/LoginForm';

describe('login features', () => {
	test('if login is successful, onSuccess callback is called which redirects the user', async () => {
		const user = {
			email: 'test@email.com',
			password: '123456',
		};
		const onSuccess = jest.fn();
		await customRender(<LoginForm onSuccess={onSuccess} />);

		userEvent.type(screen.getByLabelText(/Email address/i), user.email);
		userEvent.type(screen.getByLabelText(/Password/i), user.password);

		userEvent.click(screen.getByRole('button', { name: /Log in/i }));

		await waitFor(() => expect(onSuccess).toHaveBeenCalledTimes(1));
	});

	test('login with wrong password displays correct error message', async () => {
		const user = {
			email: 'test@email.com',
			password: '654321',
		};
		const onSuccess = jest.fn();
		await customRender(<LoginForm onSuccess={onSuccess} />);

		userEvent.type(screen.getByLabelText(/Email address/i), user.email);

		userEvent.type(screen.getByLabelText(/Password/i), user.password);

		userEvent.click(screen.getByRole('button', { name: /Log in/i }));

		const errorMsg = await screen.findByText('wrong-password');
		expect(errorMsg).toBeDefined();
	});

	test('login with non-existing email displays correct error message', async () => {
		const newUser = {
			email: 'wrong@email.com',
			password: '654321',
		};
		const onSuccess = jest.fn();
		await customRender(<LoginForm onSuccess={onSuccess} />);

		userEvent.type(screen.getByLabelText(/Email address/i), newUser.email);

		userEvent.type(screen.getByLabelText(/Password/i), newUser.password);

		userEvent.click(screen.getByRole('button', { name: /Log in/i }));

		const errorMsg = await screen.findByText('user-not-found');
		expect(errorMsg).toBeDefined();
	});
});
