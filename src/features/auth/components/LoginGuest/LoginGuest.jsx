import { toast } from 'react-toastify';

import { useLazyLoginAnonymQuery } from 'features/auth';
import { transformErrMSg } from 'utils';

import { Button, BUTTON_TYPES } from 'components/Elements';

export const LoginGuest = ({ onSuccess }) => {
	const [loginAsGuest, { isLoading }] = useLazyLoginAnonymQuery();

	const handleClick = async () => {
		try {
			await loginAsGuest().unwrap();
			toast.success('Welcome Guest!');
			onSuccess();
		} catch (error) {
			toast.error(transformErrMSg(error.message));
		}
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
