import { getRandomIndex } from '../random';
import * as Contracts from '../../contracts';
interface Schedule {
  day: number;
  hour: number;
  period: string;
}

const schedules: Array<Schedule[]> = [
  [
    { day: 1, hour: 7, period: 'manha' },
    { day: 3, hour: 7, period: 'manha' },
  ],
  [
    { day: 1, hour: 8, period: 'manha' },
    { day: 3, hour: 8, period: 'manha' },
  ],
  [
    { day: 1, hour: 13, period: 'tarde' },
    { day: 3, hour: 13, period: 'tarde' },
  ],
  [
    { day: 1, hour: 12, period: 'tarde' },
    { day: 3, hour: 12, period: 'tarde' },
  ],
  [
    { day: 1, hour: 18, period: 'noite' },
    { day: 3, hour: 18, period: 'noite' },
  ],
  [
    { day: 1, hour: 19, period: 'noite' },
    { day: 3, hour: 19, period: 'noite' },
  ],
  [
    { day: 2, hour: 7, period: 'manha' },
    { day: 4, hour: 7, period: 'manha' },
  ],
  [
    { day: 2, hour: 8, period: 'manha' },
    { day: 4, hour: 8, period: 'manha' },
  ],
  [
    { day: 2, hour: 13, period: 'tarde' },
    { day: 4, hour: 13, period: 'tarde' },
  ],
  [
    { day: 2, hour: 12, period: 'tarde' },
    { day: 4, hour: 12, period: 'tarde' },
  ],
  [
    { day: 2, hour: 18, period: 'noite' },
    { day: 4, hour: 18, period: 'noite' },
  ],
  [
    { day: 2, hour: 19, period: 'noite' },
    { day: 4, hour: 19, period: 'noite' },
  ],
  [{ day: 5, hour: 7, period: 'manha' }],
  [{ day: 6, hour: 7, period: 'manha' }],
  [{ day: 5, hour: 8, period: 'manha' }],
  [{ day: 6, hour: 8, period: 'manha' }],
  [{ day: 5, hour: 12, period: 'tarde' }],
  [{ day: 6, hour: 12, period: 'tarde' }],
  [{ day: 5, hour: 13, period: 'tarde' }],
  [{ day: 6, hour: 13, period: 'tarde' }],
  [{ day: 5, hour: 18, period: 'noite' }],
  [{ day: 6, hour: 18, period: 'noite' }],
  [{ day: 5, hour: 19, period: 'noite' }],
  [{ day: 6, hour: 19, period: 'noite' }],
];

export const sortSchedule = (
  recurrence: number,
  periodRandom: Contracts.Period,
): {
  day1: number;
  hour1: number;
  day2?: number;
  hour2?: number;
} => {
  const scheduleFiltered = schedules.filter(
    (item) => item.length === recurrence && item[0].period === periodRandom,
  );

  if (scheduleFiltered.length == 0) {
    return {
      day1: 0,
      hour1: 0,
      day2: 0,
      hour2: 0,
    };
  }

  if (recurrence == 1) {
    const randomDay = getRandomIndex(scheduleFiltered) as Schedule[];

    return {
      day1: randomDay[0].day,
      hour1: randomDay[0].hour,
    };
  }

  if (recurrence == 2) {
    const randomDay = getRandomIndex(scheduleFiltered) as Schedule[];

    return {
      day1: randomDay[0].day,
      hour1: randomDay[0].hour,
      day2: randomDay[1].day,
      hour2: randomDay[1].hour,
    };
  }

  return {
    day1: 0,
    hour1: 0,
    day2: 0,
    hour2: 0,
  };
};
