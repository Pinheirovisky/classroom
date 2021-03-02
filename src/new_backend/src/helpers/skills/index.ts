import { Skills } from '../../contracts';

const skills: Array<Skills[]> = [
  ['s1', 's2', 's3'],
  ['r1', 'r2', 'r3'],
  ['w1', 'w2', 'w3'],
  ['l1', 'l2', 'l3'],
];

export const randomSkillsOrder = () => {
  const shuffled = skills.sort(() => Math.random() - 0.5);

  return shuffled.flat();
};
