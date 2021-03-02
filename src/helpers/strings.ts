type Parseday =
  | 'Segunda'
  | 'Terça'
  | 'Quarta'
  | 'Quinta'
  | 'Sexta'
  | 'NOT VALID';

const parseDay = (number: number): Parseday => {
  switch (number) {
    case 1:
      return 'Segunda';
    case 2:
      return 'Terça';
    case 3:
      return 'Quarta';

    case 4:
      return 'Quinta';
    case 5:
      return 'Sexta';

    default:
      return 'NOT VALID';
  }
};

const capitalize = (word: string): string =>
  word.charAt(0).toUpperCase() + word.slice(1);

const polishPeriod = (): string => 'manhã';

export { parseDay, polishPeriod, capitalize };
