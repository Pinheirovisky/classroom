import { ScheduleReturn } from './ScheduleReturn';
import { Student } from './Student';

export type Skills =
  | 's1'
  | 's2'
  | 's3'
  | 'r1'
  | 'r2'
  | 'r3'
  | 'w1'
  | 'w2'
  | 'w3'
  | 'l1'
  | 'l2'
  | 'l3';
export type Period = 'manha' | 'tarde' | 'noite';
export type Recurrence = 1 | 2;

export interface Classroom extends Omit<ScheduleReturn, 'days'> {
  students: Student[];
  period: Period;
  skills: Skills[];
  day: string[];
  hour: string[];
}

export interface ClassroomWithLevel extends Classroom {
  level: number;
}
