export function createElements(n) {
	const elements = [];
	for (let i = 1; i <= n; i++) {
		elements.push(i);
	}
	return elements;
}

export function extractArray(formData) {
	const arr = [];
	const splitArray = [];
	for (let [key, value] of formData) {
		arr.push({ [key]: value });
	}
	while (arr.length > 0) splitArray.push(arr.splice(0, 4));
	return splitArray;
}
