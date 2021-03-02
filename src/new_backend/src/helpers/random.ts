import { rangeDateRecurred, nextDate } from './date';

export const getRandomIndex = (items: unknown[]): unknown => {
  return items[Math.floor(Math.random() * items.length)];
};

export const randomIntFromInterval = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const randomScheduleFromDays = ({
  days,
  hours,
}: {
  days: number[];
  hours: number[];
}): Date[] => {
  let listDate: Date[] = [];

  if (days.length == 1) {
    const [day1] = days;
    const [hour1] = hours;
    listDate = rangeDateRecurred(6, nextDate(day1), hour1);

    const newList = rangeDateRecurred(6, nextDate(day1), hour1 + 1);

    return [...listDate, ...newList].sort((a, b) => (a > b ? 1 : -1));
  }

  if (days.length == 2) {
    const [day1, day2] = days;
    const [hour1, hour2] = hours;
    listDate = rangeDateRecurred(6, nextDate(day1), hour1);
    const newList = [
      ...listDate,
      ...rangeDateRecurred(6, nextDate(day2), hour2),
    ];

    return newList.sort((a, b) => (a > b ? 1 : -1));
  }

  return listDate;
};
