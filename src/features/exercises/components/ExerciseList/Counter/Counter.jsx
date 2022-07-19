import { calcCurrentNumber } from 'features/exercises';

export const Counter = ({ counter, page }) => {
	const number = calcCurrentNumber(counter, page);
	return (
		<p>
			{number} of {counter} showing
		</p>
	);
};
