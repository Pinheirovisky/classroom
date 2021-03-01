export const getRandomIndex = (items: unknown[]): number => {
  return items[Math.floor(Math.random() * items.length)] as number;
};

export const randomIntFromInterval = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
