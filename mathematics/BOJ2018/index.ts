// 2018: 수들의 합 5
import { readFileSync } from "fs";

export const parseInput = (input: string) => +input;

export const solve = (n: number) => {
  let ret = 1;

  if (n < 3) return ret;

  let left = 1,
    right = 2,
    sum = 3;

  const isDone = () => left === right;
  const isOver = () => sum >= n;
  const isSame = () => sum === n;
  const increaseLeft = () => (sum -= left++);
  const increaseRight = () => (sum += ++right);

  while (!isDone()) {
    if (isOver()) {
      if (isSame()) ret++;
      increaseLeft();
    } else increaseRight();
  }

  return ret;
};

const print = () => {
  const input = readFileSync("/dev/stdin").toString().trim();
  const n = parseInput(input);
  const ret = solve(n);

  console.log(ret.toString());
};

print();
