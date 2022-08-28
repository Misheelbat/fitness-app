export const transformErrMSg = (errorMessage) => {
	console.log(errorMessage);
	const arr = errorMessage.split('/');
	if (arr) {
		const errMsg = arr[1].split(')');
		return errMsg[0];
	}
	return 'Oops something went wrong';
};
