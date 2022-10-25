export const EVENT_STATUS = {
	inComplete: 'inComplete',
	complete: 'complete',
	tobeCompleted: 'tobeCompleted',
};

export const DEFAULT_EVENT_STATUS_OPTIONS = {
	[EVENT_STATUS.inComplete]: {
		label: 'InComplete',
		value: EVENT_STATUS.inComplete,
	},
	[EVENT_STATUS.complete]: { label: 'Completed', value: EVENT_STATUS.complete },
	[EVENT_STATUS.tobeCompleted]: {
		label: 'To be completed',
		value: EVENT_STATUS.tobeCompleted,
	},
};
