export const parseDay = (number: number): string => {
  switch (number) {
    case 1:
      return 'segunda';
    case 2:
      return 'terca';
    case 3:
      return 'quarta';
    case 4:
      return 'quinta';
    case 5:
      return 'sexta';
    case 6:
      return 'sabado';
    case 7:
      return 'domingo';
    default:
      return 'NOT VALID';
  }
};
