import { Period, Skills, Student } from 'new_backend/src/contracts';
import { ScheduleReturn } from 'new_backend/src/contracts/ScheduleReturn';

export interface Schedules {
  schedule: string;
  rooms_concurrently: number;
}

export interface SchedulesResult {
  max: number;
  min: number;
  schedules: Schedules[];
}

export interface MockSearch {
  alunos: Array<number>;
  recorrencia: number;
  periodo: string;
  skills: Array<string>;
  dia: Array<string>;
  horario: Array<string>;
}

export interface Classroom extends Omit<ScheduleReturn, 'days'> {
  students: Student[];
  period: Period;
  skills: Skills[];
  day: string[];
  hour: string[];
  is_new?: boolean;
}
