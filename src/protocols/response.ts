export interface Schedules {
  schedule: string;
  rooms_concurrently: number;
}

export interface SchedulesResult {
  max: number;
  min: number;
  schedules: Schedules[];
}