import { equipment } from '../assets/equipmentTable';

export function extractCategory(categories) {
	return categories.results.map((category) => ({
		value: category.name,
		label: category.name_en
			? `${category.name} (${category.name_en})`
			: category.name,
		id: category.id,
	}));
}

export function extractEquipment(data) {
	if (data.length && data.length === 0) return 'No Equipment';
	return data.map((d) => {
		let eq = d;
		if (typeof d === 'object' && d !== null) eq = d.id;
		return equipment[eq];
	});
}

export function calcCurrentNumber(allNumber, page) {
	const currentNumber = 5 * (page + 1);
	if (currentNumber > allNumber) return allNumber;
	return currentNumber;
}

