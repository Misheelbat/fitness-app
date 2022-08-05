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
	if (data.length === 0) return '';
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

// export const extractExercise = (data) => {
// 	const exercises = data.results.map((ex) => {
// 		const eqwith = equipments.find((eq) => eq.id === ex.equipment[0]);
// 		return {
// 			name: ex.name,
// 			equipment: eqwith ? eqwith.name : '',
// 			id: ex.exercise_base,
// 		};
// 	});

// 	const isNext = data.next ? true : false;
// 	return { count: data.count, exercises, isNext };
// };
