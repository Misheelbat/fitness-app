export const userData = {
	displayName: 'testUser',
	email: 'test@email.com',
	password: 'testPassword',
	confirmPassword: 'testPassword',
};
export const userDataGenerator = (userEmail = 'test@email.com') => {
	return { ...userData, email: userEmail };
};
