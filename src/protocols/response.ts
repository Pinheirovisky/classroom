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
