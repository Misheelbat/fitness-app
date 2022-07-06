import {
	customRender,
	userEvent,
	screen,
	waitFor,
	clearUserDb,
	createNewUser,
	act,
} from 'test/test-utils';
import { userDataGenerator } from 'test/data-generators';

import { RegisterForm } from '../RegisterForm/RegisterForm';

describe('register functions', () => {
	beforeAll(async () => {
		await act(async () => {
			await clearUserDb();
		});
	});

	afterEach(async () => {
		await act(async () => {
			await clearUserDb();
		});
	});

	const newUser = userDataGenerator('register@email.com');

	test('registering a new user works and call onSuccess cb', async () => {
		const onSuccess = jest.fn();
		await customRender(<RegisterForm onSuccess={onSuccess} />);

		userEvent.type(screen.getByLabelText(/Display Name/i), newUser.email);
		userEvent.type(screen.getByLabelText(/Email address/i), newUser.email);
		userEvent.type(screen.getByLabelText(/^Password/i), newUser.password);
		userEvent.type(
			screen.getByLabelText(/^Confirm Password/i),
			newUser.password
		);

		userEvent.click(screen.getByRole('button', { name: /Register/i }));

		await waitFor(() => expect(onSuccess).toHaveBeenCalledTimes(1));
	});

	test('registering with already existing email displays the correct error msg', async () => {
		await createNewUser(newUser);

		await customRender(<RegisterForm />);

		userEvent.type(screen.getByLabelText(/Display Name/i), newUser.email);
		userEvent.type(screen.getByLabelText(/Email address/i), newUser.email);
		userEvent.type(screen.getByLabelText(/^Password/i), newUser.password);
		userEvent.type(
			screen.getByLabelText(/^Confirm Password/i),
			newUser.password
		);

		userEvent.click(screen.getByRole('button', { name: /Register/i }));

		// const errorMsg = await screen.findByText(/^email-already-in-use$/i);
		await waitFor(() =>
			expect(screen.findByText(/^email-already-in-use$/i)).toBeDefined()
		);
	});

	test('entering wrong password at Confirm Password displays correct error Msg', async () => {
		const wrongConfirmPassword = 'wrongPassword';

		await customRender(<RegisterForm />);

		userEvent.type(screen.getByLabelText(/Display Name/i), newUser.email);
		userEvent.type(screen.getByLabelText(/Email address/i), newUser.email);
		userEvent.type(screen.getByLabelText(/^Password/i), newUser.password);
		userEvent.type(
			screen.getByLabelText(/^Confirm Password/i),
			wrongConfirmPassword
		);

		userEvent.click(screen.getByRole('button', { name: /Register/i }));

		// const errorMsg = await screen.findByText(/^Passwords do not match$/i);
		await waitFor(() =>
			expect(screen.findByText(/^Passwords do not match$/i)).toBeDefined()
		);
	});
});
