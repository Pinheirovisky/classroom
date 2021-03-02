import * as Contracts from '../../contracts';
import {
  randomIntFromInterval,
  getRandomIndex,
  randomScheduleFromDays,
} from '../random';
import { parseDay } from '../parse';
import { listStudents } from '../students';
import { sortSchedule } from '../schedules';
import { randomSkillsOrder } from '../skills';

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
  const periods = ['manha', 'tarde', 'noite'];

  const mntStudent = numberStudent
    ? numberStudent
    : randomIntFromInterval(1, 12);
  const periodRandom = getRandomIndex(periods) as Contracts.Period;

  const students = listStudents(mntStudent);
  const recurrence = sortRecurrence();
  const dayRandom = sortSchedule(recurrence, periodRandom);

  const days =
    recurrence === 2
      ? ([dayRandom['day1'], dayRandom['day2']] as number[])
      : [dayRandom['day1']];

  const hours =
    recurrence === 2
      ? ([dayRandom['hour1'], dayRandom['hour2']] as number[])
      : [dayRandom['hour1']];

  const skills = randomSkillsOrder();

  const schedulesRandom = randomScheduleFromDays({ days, hours });

  return {
    id,
    students,
    recurrence,
    period: periodRandom,
    schedules: schedulesRandom,
    actual_schedule: schedulesRandom[0],
    skills,
    actual_skill: getRandomIndex(skills) as Contracts.Skills,
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
