import { auth } from 'utils';

export const getUser = () => {
	const data = auth.currentUser;
	if (data !== null) {
		const { displayName, email } = data;
		return { displayName, email };
	} else {
		return null;
	}
};
