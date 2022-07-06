import {
	customRender,
	screen,
	waitFor,
	userEvent,
	createNewUser,
	clearUserDb,
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

	test('if login is successful, onSuccess callback is called which redirects the user', async () => {
		const user = userDataGenerator();

		const onSuccess = jest.fn();
		await customRender(<LoginForm onSuccess={onSuccess} />);

		userEvent.type(screen.getByLabelText(/Email address/i), user.email);
		userEvent.type(screen.getByLabelText(/Password/i), user.password);
		userEvent.click(screen.getByRole('button', { name: /Log in/i }));

		await waitFor(() => expect(onSuccess).toHaveBeenCalledTimes(1));
	});

	test('login with wrong password displays correct error message', async () => {
		const newUser = userDataGenerator();
		const user = {
			email: newUser.email,
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
		const user = {
			email: 'wrong@email.com',
			password: '654321',
		};

		const onSuccess = jest.fn();
		await customRender(<LoginForm onSuccess={onSuccess} />);

		userEvent.type(screen.getByLabelText(/Email address/i), user.email);
		userEvent.type(screen.getByLabelText(/Password/i), user.password);
		userEvent.click(screen.getByRole('button', { name: /Log in/i }));

		const errorMsg = await screen.findByText(/^user-not-found$/i);
		expect(errorMsg).toBeDefined();
	});
});
