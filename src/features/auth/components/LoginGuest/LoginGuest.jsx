import { useState } from 'react';

import { useAuth } from 'features/auth';
import { Button } from 'components/Elements';
import { BUTTON_TYPES } from 'components/Elements';
import { tranformErrMSg } from 'utils';

export const LoginGuest = ({ onSuccess }) => {
	const { loginAsGuest } = useAuth();
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const handleClick = async () => {
		try {
			setError('');
			setIsLoading(true);

			await loginAsGuest();
			onSuccess();
		} catch (error) {
			setError(tranformErrMSg(error.message));
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
