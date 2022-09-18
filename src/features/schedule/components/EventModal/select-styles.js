export const selectorStyles = {
	control: (styles) => ({
		...styles,
		backgroundColor: '#1c1f2e',
		fontSize: '14px',
		border: '0',
		minHeight: '30px',
		cursor: 'pointer',
	}),

	singleValue: (styles) => ({
		...styles,
		color: 'white',
		cursor: 'pointer',
	}),

	menu: (styles) => ({
		...styles,
		backgroundColor: '#1c1f2e',
		fontSize: '14px',
		color: '#d9d9d9',
	}),

	option: (styles, { isFocused }) => ({
		...styles,
		backgroundColor: isFocused ? '#2267dc' : null,
		minWidth: 'max-content',
		width: '100%',
		cursor: 'pointer',
	}),
	container: (styles) => ({
		...styles,
		width: '100%',
	}),
};
