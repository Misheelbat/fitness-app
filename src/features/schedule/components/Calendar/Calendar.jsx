import { useState } from 'react';
import { add, differenceInDays, endOfMonth, format, setDate, startOfMonth, sub } from 'date-fns';

import { Cell } from '../Cell/Cell';
import { Button } from 'components/Elements';
import { weeks } from 'features/schedule/assets/calendar_default';
import styles from './Calendar.module.css';

export const Calendar = ({ event }) => {
	const [currentDate, setCurrentDate] = useState(new Date());
	const startDate = startOfMonth(currentDate);
	const endDate = endOfMonth(currentDate);
	const nDaysOfMonth = differenceInDays(endDate, startDate) + 1;

	const prefixDays = startDate.getDay();
	const suffixDays = 6 - endDate.getDay();

	const prevMonth = () => setCurrentDate(sub(currentDate, { months: 1 }));
	const nextMonth = () => setCurrentDate(add(currentDate, { months: 1 }));
	const prevYear = () => setCurrentDate(sub(currentDate, { years: 1 }));
	const nextYear = () => setCurrentDate(add(currentDate, { years: 1 }));

	const handleSetToday = () => setCurrentDate(new Date());
	const handleClickDate = (dayOfMonth) => {
		const date = setDate(currentDate, dayOfMonth);
		setCurrentDate(date);
	};

	const monthAndYear = format(currentDate, 'LLLyyyy');

	const calendarDays = Array.from({ length: nDaysOfMonth }).map((_, index) => {
		const dayOfMonth = index + 1;
		const fullDate = dayOfMonth + monthAndYear;

		const isCurrentDate = dayOfMonth === currentDate.getDate();
		return (
			<Cell key={dayOfMonth} event={event[fullDate]} isActive={isCurrentDate} onClick={() => handleClickDate(dayOfMonth)}>
				{dayOfMonth}
			</Cell>
		);
	});

	return (
		<div className={styles.calendar}>
			<Button onClick={handleSetToday}>Today</Button>
			<div className={styles.col}>
				<div className={styles.colHeader}>
					<Cell onClick={prevYear}>{'<<'}</Cell>
					<Cell onClick={prevMonth}>{'<'}</Cell>
					<Cell className={styles.spanThree}>{format(currentDate, 'LLLL yyyy')}</Cell>
					<Cell onClick={nextMonth}>{'>'}</Cell>
					<Cell onClick={nextYear}>{'>>'}</Cell>
				</div>
				<div className={styles.weeks}>
					{weeks.map((week) => (
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
