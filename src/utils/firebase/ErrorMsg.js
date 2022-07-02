export const transformErrMSg = (errorMessage) => {
	const arr = errorMessage.split('/');
	const errMsg = arr[1].split(')');
	return errMsg[0];
};
