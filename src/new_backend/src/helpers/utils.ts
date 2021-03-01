export function arrayEqual(array1: string[], array2: string[]) {
  if (array1.length > 1) {
    return array1.includes(array2[0]) && array1.includes(array2[1]);
  }
  return array1.includes(array2[0]);
}
