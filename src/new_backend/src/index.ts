import * as Contracts from './contracts';
import { mockListClassRooms } from './helpers/class-rooms';
import { bo } from './bo';

function main(
  recurrence: Contracts.Recurrence,
  period: Contracts.Period,
  day: Contracts.ScheduleDays,
  classrooms: Contracts.Classroom[],
): Contracts.ClassroomWithLevel[] {
  return bo({
    recurrence,
    period,
    day,
    classrooms,
  });
}

// let classrooms = mockListClassRooms({
//   numberClassroom:100,
// });

// console.log('aqui',main(1, "manha", [ "sexta"], classrooms));

export { main, mockListClassRooms };
