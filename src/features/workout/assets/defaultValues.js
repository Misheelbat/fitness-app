// default value for weight/rep unit, in react-select format
export const REP_UNIT_DEFAULT_VALUE = [
	{ value: 'Repetitions', label: 'Reps' },
	{ value: 'Max Reps', label: 'Max Reps' },
];

export const WEIGHT_UNITS_DEFAULT_VALUE = [
	{ value: 'kg', label: 'kg' },
	{ value: 'Body Weight', label: 'Body Weight' },
];

// default value for number of exercise sets
export const SETS_DEFAULT_VALUE = 1;

const mockdataDb = {
	id: ['Core Blast', 'Full Body'],
	entities: {
		'Core Blast': {
			name: 'Core Blast',
			reps: {
				ids: [205, 192],
				entities: {
					192: {
						id: 192,
						reps: {
							reps: ['5', '10', '7'],
							weight: ['40', '40', '50'],
							weightUnit: ['kg'],
							repsUnit: ['Repetitions'],
						},
					},
					205: {
						id: 205,
						reps: {
							reps: ['10', '15'],
							weight: ['10', '20'],
							weightUnit: ['kg'],
							repsUnit: ['Repetitions'],
						},
					},
				},
			},
		},
		'Full Body': {
			name: 'Full Body',
			reps: {
				ids: [205, 192],
				entities: {
					192: {
						id: 192,
						reps: {
							reps: ['5', '10', '7'],
							weight: ['40', '40', '50'],
							weightUnit: ['kg'],
							repsUnit: ['Repetitions'],
						},
					},
					205: {
						id: 205,
						reps: {
							reps: ['10', '15'],
							weight: ['10', '20'],
							weightUnit: ['kg'],
							repsUnit: ['Repetitions'],
						},
					},
				},
			},
		},
	},
};

const Person = [
	{
		name: 'Bent Over Barbell Row',
		category: 'Back',
		equipments: ['Barbell'],
		sets: 4,
		reps: 10,
	},
	{
		name: 'Bench Press',
		category: 'Chest',
		equipments: ['Bench', 'Barbell'],
		sets: 4,
		reps: 10,
	},
];