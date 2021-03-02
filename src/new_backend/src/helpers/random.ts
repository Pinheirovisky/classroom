export const getRandomIndex = (items: unknown[]): unknown => {
  return items[Math.floor(Math.random() * items.length)];
};

export const randomIntFromInterval = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const getDaysFromNumberWeek = ({ days }: { days: number[] }): Date[] => {
  const recurrence = days.length > 1 ? 2 : 1;
  let listDate: Date[] = [];

  console.log('days', days);

  if (recurrence === 1) {
    listDate = Array.from(Array(12).keys()).map(() => {
      return new Date();
    });
  }

  if (recurrence === 2) {
    listDate = Array.from(Array(6).keys()).map(() => {
      return new Date();
    });
  }

  return listDate;
};
