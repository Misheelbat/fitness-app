const customStyles = {
	control: (styles) => ({
		...styles,
		backgroundColor: '#1c1f2e',
		fontSize: '14px',
		width: 'fit-content',
		border: 'none',
		cursor: 'pointer',
	}),
	container: (styles) => ({
		...styles,
		width: 'fit-content',
	}),

	singleValue: (styles) => ({
		...styles,
		color: 'white',
		cursor: 'pointer',
	}),
	dropdownIndicator: (styles) => ({
		...styles,
		padding: '2px',
	}),

	menu: (styles) => ({
		...styles,
		backgroundColor: '#1c1f2e',
		fontSize: '14px',
		color: '#d9d9d9',
		marginTop: '1px',
	}),

	option: (styles, { isFocused }) => ({
		...styles,
		backgroundColor: isFocused ? '#2267dc' : null,
		cursor: 'pointer',
	}),
};
export default customStyles;
