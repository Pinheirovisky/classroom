import { getRandomIndex } from '../random';

const days: Array<number[]> = [[1, 3], [2, 4], [5], [6]];
const hours = [7, 8];

export const sortSchedule = (
  recurrence: number,
): {
  day1: number;
  hour1: number;
  day2?: number;
  hour2?: number;
} => {
  const hour = getRandomIndex(hours);
  const day = getRandomIndex(days);

  if (recurrence === 1) {
    return {
      hour1: hour,
      day1: day,
    };
  }

  const hour2 = getRandomIndex(hours);
  let day2 = getRandomIndex(days);

  if (day2 === day) {
    while (day2 === day) {
      day2 = getRandomIndex(days);
    }
  }

  return {
    day1: day,
    hour1: hour,
    day2: day2,
    hour2: hour2,
  };
};
