import { Skills } from './Classroom';
export interface ScheduleReturn {
  id: number;
  recurrence: number;
  days: string[];
  actual_skill: Skills;
}
