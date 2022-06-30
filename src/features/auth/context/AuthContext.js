import { createContext, useContext, useEffect, useState } from 'react';

import {
	registerWithEmailAndPassword,
	loginAuthUserWithEmailAndPassword,
} from '../api';
import { onAuthStateListener } from 'utils';
import { signoutUser } from 'utils';

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

	useEffect(() => {
		const unsub = onAuthStateListener((user) => {
			if (user) {
				const { displayName, email } = user;
				setCurrentUser({ displayName, email });
				setIsLoading(true);
			}
			setIsLoading(true);
		});

		return unsub;
	}, []);

	const value = {
		currentUser,
		setCurrentUser,
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
