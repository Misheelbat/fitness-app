import { add, differenceInDays, endOfMonth, format, setDate, startOfMonth, sub } from 'date-fns';

import { Cell } from '../Cell/Cell';
import { Button } from 'components/Elements';
import { weekDays } from 'features/schedule/assets/default_week_days';
import styles from './Calendar.module.css';

export const Calendar = ({ events = {}, value, onDateChange }) => {
	const startDate = startOfMonth(value);
	const endDate = endOfMonth(value);
	const daysInCurrentMonth = differenceInDays(endDate, startDate) + 1;
	const prefixDays = startDate.getDay();
	const suffixDays = 6 - endDate.getDay();

	const prevMonth = () => onDateChange(sub(value, { months: 1 }));
	const nextMonth = () => onDateChange(add(value, { months: 1 }));
	const prevYear = () => onDateChange(sub(value, { years: 1 }));
	const nextYear = () => onDateChange(add(value, { years: 1 }));

	const handleSetToday = () => onDateChange(new Date());
	const handleClickDate = (dayOfMonth) => {
		const date = setDate(value, dayOfMonth);
		onDateChange(date);
	};

	const monthAndYear = format(value, 'LLLyyyy');

	const calendarDays = Array.from({ length: daysInCurrentMonth }).map((_, index) => {
		const dayNumber = index + 1;
		const fullDate = dayNumber + monthAndYear;
		const isCurrentDate = dayNumber === value.getDate();
		return (
			<Cell
				key={dayNumber}
				event={events[fullDate]}
				isActive={isCurrentDate}
				onClick={() => handleClickDate(dayNumber)}
			>
				{dayNumber}
			</Cell>
		);
	});

	return (
		<div className={styles.calendar}>
			{/* <Button onClick={handleSetToday}>Today</Button> */}
			<div className={styles.colHeader}>
				<div onClick={prevYear}>{'<<'}</div>
				<div onClick={prevMonth}>{'<'}</div>
				<div onClick={nextMonth}>{'>'}</div>
				<div onClick={nextYear}>{'>>'}</div>
				<div className={styles.spanThree}>{format(value, 'LLLL yyyy')}</div>
			</div>
			<div className={styles.col}>
				<div className={styles.weeks}>
					{weekDays.map((week) => (
						<Cell key={week}>{week}</Cell>
					))}
				</div>

				{Array.from({ length: prefixDays }).map((_, index) => (
					<Cell key={index} />
				))}
				{calendarDays}
				{Array.from({ length: suffixDays }).map((_, index) => (
					<Cell key={index} />
				))}
			</div>
		</div>
	);
};
