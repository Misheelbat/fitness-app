import { useState } from 'react';
import { auth } from 'utils';
import { tranformErrMSg } from 'utils';

export const useUpdate = () => {
	const [isError, setIsError] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const update = async (callback, data) => {
		try {
			setIsError('');
			setIsLoading(true);
			await callback(data);
			await auth.currentUser.reload();
		} catch (error) {
			console.log('err', error.message);

			setIsError(tranformErrMSg(error.message));
		}
		setIsLoading(false);
	};

	return { update, isLoading, isError };
};
