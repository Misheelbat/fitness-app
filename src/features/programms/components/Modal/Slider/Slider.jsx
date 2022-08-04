import { useSelector, useDispatch } from 'react-redux';

import { selectSets, setSets } from 'features/programms/store';
import styles from './Slider.module.css';

export const Slider = () => {
	const sliderVal = useSelector(selectSets);
	const dispatch = useDispatch();
	const handleRange = (e) => {
		dispatch(setSets(e.target.value));
	};
	console.log(sliderVal);
	return (
		<input
			className={styles.slider}
			type="range"
			min="1"
			max="10"
			value={sliderVal}
			onChange={handleRange}
		/>
	);
};
