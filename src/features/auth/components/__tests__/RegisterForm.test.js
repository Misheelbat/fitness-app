import { customRender, userEvent, screen, waitFor } from 'test/test-utils';
import { RegisterForm } from '../RegisterForm/RegisterForm';
import { clearAllUser } from 'utils/firebase';

describe('register functions', () => {
	beforeEach(async () => {
		await clearAllUser();
	});

	test('register user', async () => {
		const newUser = {
			email: 'test2@email.com',
			password: '123456',
		};

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
});
