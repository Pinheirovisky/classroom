import * as Contracts from './index';

export interface BO {
  recurrence: Contracts.Recurrence;
  period: Contracts.Period;
  day: Contracts.ScheduleDays;
  classrooms: Contracts.Classroom[];
}
