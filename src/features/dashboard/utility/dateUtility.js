export const nearestFutureEventDateFn = (dateArr) => {
	const today = new Date();
	const futArr = dateArr.filter((n) => new Date(n.id) >= today);
	return futArr.length > 0 ? futArr[0] : null;
};
