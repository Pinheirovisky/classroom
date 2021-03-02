export const rangeDateRecurred = (
  recurrence = 0,
  dateStart: Date,
  hour: number,
): Date[] => {
  dateStart.setHours(hour);
  dateStart.setMinutes(0);
  dateStart.setSeconds(0);
  dateStart.setMilliseconds(0);

  if (recurrence === 0) return [dateStart];

  return Array.from(Array(recurrence).keys()).map((index) => {
    if (index == 0) return new Date(dateStart);

    return new Date(dateStart.setDate(dateStart.getDate() + 7));
  });
};

export const nextDate = (dayIndex: number): Date => {
  const today = new Date();
  today.setDate(
    today.getDate() + ((dayIndex - 1 - today.getDay() + 7) % 7) + 1,
  );
  return today;
};
