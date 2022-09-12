import { useState } from 'react';
import { add, differenceInDays, endOfMonth, format, setDate, startOfMonth, sub } from 'date-fns';
import { Cell } from '../Cell/Cell';

import styles from './Calendar.module.css';
import { Button } from 'components/Elements';

const weeks = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export const Calendar = () => {
	const [currentDate, setCurrentDate] = useState(new Date());
	const startDate = startOfMonth(currentDate);
	const endDate = endOfMonth(currentDate);
	const numDays = differenceInDays(endDate, startDate) + 1;

	const prefixDays = startDate.getDay();
	const suffixDays = 6 - endDate.getDay();

	const handleSetToday = () => setCurrentDate(new Date());
	const prevMonth = () => setCurrentDate(sub(currentDate, { months: 1 }));
	const nextMonth = () => setCurrentDate(add(currentDate, { months: 1 }));
	const prevYear = () => setCurrentDate(sub(currentDate, { years: 1 }));
	const nextYear = () => setCurrentDate(add(currentDate, { years: 1 }));

	const handleClickDate = (index) => {
		const date = setDate(currentDate, index);
		setCurrentDate(date);
	};

	return (
		<div>
			<Button onClick={handleSetToday}>Today</Button>
			<div className={styles.col}>
				<Cell onClick={prevYear}>{'<<'}</Cell>
				<Cell onClick={prevMonth}>{'<'}</Cell>
				<Cell className={styles.spanThree}>{format(currentDate, 'LLLL yyyy')}</Cell>
				<Cell onClick={nextMonth}>{'>'}</Cell>
				<Cell onClick={nextYear}>{'>>'}</Cell>

				{weeks.map((week) => (
					<Cell key={week} className={styles.weeks}>
						{week}
					</Cell>
				))}

				{Array.from({ length: prefixDays }).map((_, index) => (
					<Cell key={index} />
				))}

				{Array.from({ length: numDays }).map((_, index) => {
					const date = index + 1;
					const isCurrentDate = date === currentDate.getDate();

					return (
						<Cell key={date} isActive={isCurrentDate} onClick={() => handleClickDate(date)}>
							{date}
						</Cell>
					);
				})}

				{Array.from({ length: suffixDays }).map((_, index) => (
					<Cell key={index} />
				))}
			</div>
		</div>
	);
};
