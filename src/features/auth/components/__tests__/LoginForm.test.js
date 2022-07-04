import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LoginForm } from '../LoginForm/LoginForm';
import { render } from 'test/test-utils';

test('should login user and call passed cb to redirect user after', async () => {
	const newUser = {
		email: 'mike@mail.com',
		password: '123456',
	};
	const onSuccess = jest.fn();
	await render(<LoginForm onSuccess={onSuccess} />);

	userEvent.type(screen.getByLabelText(/Email address/i), newUser.email);

	userEvent.type(screen.getByLabelText(/Password/i), newUser.password);

	userEvent.click(screen.getByRole('button', { name: /Log in/i }));

	await waitFor(() => expect(onSuccess).toHaveBeenCalledTimes(1));
});
