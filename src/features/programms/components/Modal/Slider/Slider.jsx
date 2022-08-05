import styles from './Slider.module.css';

export const Slider = ({ sliderValue, setSliderValue }) => {
	const handleRange = (e) => {
		setSliderValue(e.target.value);
	};

	return (
		<input
			className={styles.slider}
			name="slider"
			type="range"
			min="1"
			max="10"
			value={sliderValue}
			onChange={handleRange}
		/>
	);
};
