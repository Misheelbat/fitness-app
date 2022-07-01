import { EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import { auth } from 'utils';

const reAuthUser = (pass) => {
	const credentials = EmailAuthProvider.credential(
		auth.currentUser.email,
		pass
	);
	return reauthenticateWithCredential(auth.currentUser, credentials);
};
