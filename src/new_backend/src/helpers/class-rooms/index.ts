import * as Contracts from '../../contracts';
import { randomIntFromInterval } from '../random';
import { parseDay } from '../parse';
import { listStudents } from '../students';
import { sortSchedule } from '../schedules';

const sortRecurrence = (): number => {
  return randomIntFromInterval(1, 2);
};

const classroom = ({
  id,
  numberStudent,
}: {
  id: number;
  numberStudent?: number;
}): Contracts.Classroom => {
  const mntStudent = numberStudent
    ? numberStudent
    : randomIntFromInterval(1, 12);
  const students = listStudents(mntStudent);
  const recurrence = sortRecurrence();
  const dayRandom = sortSchedule(recurrence);
  const days =
    Object.keys(dayRandom).length > 2
      ? ([dayRandom['day1'], dayRandom['day2']] as number[])
      : [dayRandom['day1']];

  const hours =
    Object.keys(dayRandom).length > 2
      ? [dayRandom['hour1'], dayRandom['hour2']]
      : [dayRandom['hour1']];

  return {
    id,
    students,
    recurrence,
    period: 'manha',
    skills: [
      's1',
      's2',
      's3',
      'r1',
      'r2',
      'r3',
      'w1',
      'w2',
      'w3',
      'l1',
      'l2',
      'l3',
    ],
    day: days.map((day) => parseDay(day)),
    hour: hours.map((hour) => `${String(hour).padStart(2, '0')}:00`),
  };
};

export const mockListClassRooms = ({
  numberClassroom = 0,
  numberStudentByRoom,
}: {
  numberClassroom?: number;
  numberStudentByRoom?: number;
}): Contracts.Classroom[] => {
  return Array.from(Array(numberClassroom).keys()).map((index) => {
    return classroom({ id: index, numberStudent: numberStudentByRoom });
  });
};
