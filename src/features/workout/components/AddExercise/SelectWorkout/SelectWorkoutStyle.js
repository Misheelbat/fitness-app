const customStyles = {
	control: (styles) => ({
		...styles,
		backgroundColor: '#1c1f2e',
		fontSize: '14px',
		width: '100%',
		minWidth: 'max-content',
		border: 'none',
		padding: '2px',
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
		width: '100%',
		minWidth: 'max-content',
		color: '#d9d9d9',
	}),

	option: (styles, { isFocused }) => ({
		...styles,
		backgroundColor: isFocused ? '#2267dc' : null,
		minWidth: 'max-content',
		cursor: 'pointer',
	}),
};
export default customStyles;
