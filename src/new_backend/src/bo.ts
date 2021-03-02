import * as Contracts from './contracts';
import { arrayEqual } from './helpers/utils';

function limitClassrooms(
  possibleClassrooms: Contracts.ClassroomWithLevel[],
): Contracts.ClassroomWithLevel[] {
  if (possibleClassrooms.length > 5) {
    return possibleClassrooms.slice(0, 4);
  }
  return possibleClassrooms;
}

function getFilteredClassrooms(
  possibleClassrooms: Contracts.ClassroomWithLevel[],
): Contracts.ClassroomWithLevel[] {
  return possibleClassrooms.reduce<Contracts.ClassroomWithLevel[]>(
    (acc, cur) => {
      let equalRoom = acc.find((classroom) => {
        return (
          classroom.recurrence === cur.recurrence &&
          classroom.period === cur.period &&
          arrayEqual(classroom.day, cur.day) &&
          arrayEqual(classroom.hour, cur.hour)
        );
      });
      if (equalRoom) {
        if (equalRoom.students.length < cur.students.length) {
          equalRoom = { ...cur };
        }

        return acc;
      }

      acc.push(cur);

      return acc;
    },
    [],
  );
}

function getPossibleClassrooms(
  recurrence: Contracts.Recurrence,
  period: Contracts.Period,
  day: Contracts.ScheduleDays,
  classrooms: Contracts.Classroom[],
) {
  const clearClassrooms: Contracts.ClassroomWithLevel[] = [];

  const pushClassRoom = (classroom: Contracts.Classroom, level: number) => {
    clearClassrooms.push({
      ...classroom,
      level,
    });
  };

  classrooms.map((classroom) => {
    if (!checkClassroomEntry(classroom)) {
      return;
    }
    const equalPeriod = classroom.period === period;
    if (recurrence === 1 && classroom.recurrence === 1) {
      const equalDay = classroom.day[0] === day[0];

      if (equalDay && equalPeriod) {
        pushClassRoom(classroom, 1);
      } else if (equalDay || equalPeriod) {
        pushClassRoom(classroom, 2);
      }
    } else if (recurrence === 2 && classroom.recurrence === 2) {
      const equalDay =
        classroom.day.includes(day[0]) &&
        classroom.day.includes(day[1] as string);
      const includesDay =
        classroom.day.includes(day[0]) ||
        classroom.day.includes(day[1] as string);

      if (equalDay && equalPeriod) {
        pushClassRoom(classroom, 1);
      } else if (includesDay && equalPeriod) {
        pushClassRoom(classroom, 2);
      } else if (includesDay || equalPeriod) {
        pushClassRoom(classroom, 3);
      }
    }
  });

  return clearClassrooms;
}

function checkClassroomEntry(classroom: Contracts.Classroom) {
  if (classroom.students.length < 12 && classroom.actual_skill.includes('1')) {
    return true;
  }
  return false;
}

function formatSchedule(
  classrooms: Contracts.ClassroomWithLevel[],
): Contracts.ScheduleReturn[] {
  return classrooms.map(({ recurrence, id, day, hour, actual_skill }) => {
    return {
      recurrence,
      id,
      days: [day[0], hour[0]],
      actual_skill: actual_skill,
    };
  });
}

function sortByDate(
  classrooms: Contracts.ClassroomWithLevel[],
): Contracts.ClassroomWithLevel[] {
  const sorted = classrooms.sort((a, b) =>
    a.actual_schedule > b.actual_schedule ? 1 : -1,
  );
  return sorted;
}

// function sortByLevel(
//   classrooms: Contracts.ClassroomWithLevel[]
// ): Contracts.ClassroomWithLevel[] {
//   const sorted = classrooms.sort((a, b) => a.level - b.level);
//   return sorted;
// }

export function bo({
  recurrence,
  period,
  day,
  classrooms,
}: Contracts.BO): Contracts.ClassroomWithLevel[] {
  const possibleClassrooms = getPossibleClassrooms(
    recurrence,
    period,
    day,
    classrooms,
  );
  const filteredClassrooms = getFilteredClassrooms(possibleClassrooms);
  const sortedClassrooms = sortByDate(filteredClassrooms);
  const limitedClassrooms = limitClassrooms(sortedClassrooms);
  return limitedClassrooms;
}
