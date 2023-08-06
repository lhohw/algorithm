// 2590: 색종이
import { readFileSync } from "fs";

const coloredPaper = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map(Number);

const print = () => console.log(solve().toString());

let ret = 0;
const solve = () => {
  const count6 = cmCount(6);
  ret += count6;
  use(6, count6);

  const count5 = cmCount(5);
  ret += count5;
  use(5, count5);
  use(1, count5 * 11);

  const count4 = cmCount(4);
  ret += count4;
  use(4, count4);
  let notUsed2 = use(2, count4 * 5);
  fill2By1(notUsed2);

  const used3 = Math.floor(cmCount(3) / 4);
  ret += used3;
  use(3, used3 * 4);
  const count3 = cmCount(3);
  if (count3) {
    ret++;
    use(3, count3);
    if (count3 === 1) {
      use(1, 7);
      const notUsed2 = use(2, 5);
      fill2By1(notUsed2);
    } else if (count3 === 2) {
      use(1, 6);
      const notUsed2 = use(2, 3);
      fill2By1(notUsed2);
    } else {
      use(1, 5);
      const notUsed2 = use(2, 1);
      fill2By1(notUsed2);
    }
  }

  const count2 = cmCount(2);
  const used2 = Math.ceil(count2 / 9);
  ret += used2;
  notUsed2 = use(2, used2 * 9);
  fill2By1(notUsed2);

  const used1 = Math.ceil(cmCount(1) / 36);
  ret += used1;

  return ret;
};

const cmCount = (cm: number) => coloredPaper[cm - 1];
const use = (cm: number, count: number) => {
  const canUse = Math.min(coloredPaper[cm - 1], count);
  const notUsed = count - canUse;
  coloredPaper[cm - 1] -= canUse;
  return notUsed;
};
const fill2By1 = (notUsed: number) => use(1, notUsed * 2 * 2);

print();
