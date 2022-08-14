import { createContext, useContext, useEffect, useState } from 'react';

import {
	registerWithEmailAndPassword,
	loginAuthUserWithEmailAndPassword,
	loginAnonymously,
} from 'features/auth';
import {
	onAuthStateListener,
	signoutUser,
	resetPassWithEmail,
	createUserDocFromAuth,
} from 'utils';

import { PageSpinner } from 'components/Elements';

const AuthContext = createContext();

export const useAuth = () => {
	return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState();
	const [isLoading, setIsLoading] = useState(false);

	const register = (data) => {
		return registerWithEmailAndPassword(data);
	};

	const login = (data) => {
		return loginAuthUserWithEmailAndPassword(data);
	};

	const logOut = () => {
		signoutUser();
		window.location.assign(window.location.origin);
	};

	const resetPassword = (email) => {
		return resetPassWithEmail(email);
	};

	const loginAsGuest = () => {
		return loginAnonymously();
	};

	useEffect(() => {
		const unsub = onAuthStateListener((user) => {
			if (user) {
				if (user.providerData.length === 0) {
					setCurrentUser({ displayName: 'Guest', email: 'Guest' });
				} else {
					const { displayName, email, uid } = user;
					setCurrentUser({ displayName, email, uid });
					createUserDocFromAuth(user);
				}

				setIsLoading(true);
			}
			setIsLoading(true);
		});

		return unsub;
	}, []);

	const value = {
		currentUser,
		resetPassword,
		setCurrentUser,
		loginAsGuest,
		register,
		login,
		logOut,
	};

	return (
		<AuthContext.Provider value={value}>
			{isLoading ? children : <PageSpinner />}
		</AuthContext.Provider>
	);
};

const dummby = {
	name: '',
	id: [],
	entity: { id: '', reps: '' },
};
