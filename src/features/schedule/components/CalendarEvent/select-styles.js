const selectorStyles = {
	control: (styles) => ({
		...styles,
		backgroundColor: '#1c1f2e',
		fontSize: '14px',
		border: '0',
		padding: '2px',
		minHeight: '30px',
		cursor: 'pointer',
		textAlign: 'left',
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
		backgroundColor: isFocused ? '#d9d9d9' : null,
		color: isFocused ? 'black' : null,
		minWidth: 'max-content',
		width: '100%',
		cursor: 'pointer',
		textAlign: 'left',
	}),
	container: (styles) => ({
		...styles,
		width: '100%',
	}),
};

export default selectorStyles;
