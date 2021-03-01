import * as Contracts from '../../contracts';

export const mockRandomStudents = (index: number): Contracts.Student => {
  return { student: `Aluno #${index}`, skill: 0 };
};

export const listStudents = (number = 0): Contracts.Student[] => {
  return Array.from(Array(number).keys()).map((index) =>
    mockRandomStudents(index),
  );
};
