// 2846: 오르막길
import { readFileSync } from "fs";

const [[n], heights] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

const print = () => console.log(solve().toString());

const solve = () => {
  const gap = init();
  return findMax(gap);
};

const init = () => {
  const gap: number[] = [];
  for (let i = 0; i < n - 1; i++) {
    gap.push(heights[i + 1] - heights[i]);
  }
  return gap;
};

const findMax = (gap: number[]) => {
  let max = 0;
  let height = 0;
  for (let i = 0; i < n - 1; i++) {
    if (gap[i] > 0) {
      height += gap[i];
      max = Math.max(max, height);
    } else {
      height = 0;
    }
  }
  return max;
};

print();
