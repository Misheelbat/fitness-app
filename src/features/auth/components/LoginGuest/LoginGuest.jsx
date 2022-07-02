import { useState } from 'react';
import { toast } from 'react-toastify';

import { useAuth } from 'features/auth';
import { Button, BUTTON_TYPES } from 'components/Elements';
import { transformErrMSg } from 'utils';

export const LoginGuest = ({ onSuccess }) => {
	const { loginAsGuest } = useAuth();
	const [isLoading, setIsLoading] = useState(false);

	const handleClick = async () => {
		try {
			setIsLoading(true);
			await loginAsGuest();
			toast.success('Welcome Guest!');
			onSuccess();
		} catch (error) {
			toast.error(transformErrMSg(error.message));
		}
		setIsLoading(false);
	};

	return (
		<Button
			onClick={handleClick}
			isLoading={isLoading}
			buttonType={BUTTON_TYPES.max}
		>
			Login as Guest
		</Button>
	);
};
