import styles from './Sets.module.css';

export const Sets = ({ sliderValue, setSliderValue }) => {
	const handleRange = (e) => {
		setSliderValue(e.target.value);
	};

	return (
		<input
			className={styles.slider}
			name="NumberOfSets"
			type="range"
			min="1"
			max="10"
			value={sliderValue}
			onChange={handleRange}
		/>
	);
};
