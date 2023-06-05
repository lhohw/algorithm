// 1725: 히스토그램
import { readFileSync } from "fs";

const [n, ...heights] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map(Number);

const min = Math.min(...heights);
heights.unshift(0);
heights.push(0);

const print = () => console.log(solve().toString());

const solve = () => {
  const stack: [number, number][] = [[0, 0]];
  let ret = 0;
  for (let i = 1; i <= n + 1; i++) {
    const height = heights[i];
    while (stack.length && stack[stack.length - 1][1] >= height) {
      const [, h] = stack.pop()!;
      const width = i - 1 - (stack.length ? stack[stack.length - 1][0] : 0);
      ret = Math.max(ret, width * h);
    }
    stack.push([i, height]);
  }
  return Math.max(ret, min * n);
};

print();
