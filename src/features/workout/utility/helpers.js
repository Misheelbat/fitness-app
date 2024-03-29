export function createArray(n) {
	const elements = [];
	for (let i = 1; i <= n; i++) {
		elements.push(i);
	}
	return elements;
}

export function extractRepsData(formData) {
	const data = { reps: [], weight: [], weightUnit: [], repsUnit: [] };
	for (let [key, value] of formData) {
		switch (key) {
			case 'reps':
				data.reps.push(value);
				break;
			case 'repsUnits':
				if (data.repsUnit.includes(value)) break;
				data.repsUnit.push(value);
				break;
			case 'weight':
				data.weight.push(value);
				break;
			case 'weightUnits':
				if (data.weightUnit.includes(value)) break;
				data.weightUnit.push(value);
				break;
			default:
				break;
		}
	}
	return data;
}
