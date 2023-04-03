// 21921: 블로그
import { readFileSync } from "fs";

const [[n, x], visit] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

const partialSum = new Array(n).fill(0);
let sum = 0;
let max = 0;

const print = () => console.log(solve());

const solve = () => {
  init();
  if (max === 0) return "SAD";
  return `${max}\n${partialSum.filter((e) => e === max).length}`;
};

const init = () => {
  for (let i = 0; i < x; i++) sum += visit[i];
  partialSum[x - 1] = sum;
  max = sum;
  for (let i = x; i < n; i++) {
    partialSum[i] = partialSum[i - 1] - visit[i - x] + visit[i];
    max = Math.max(partialSum[i], max);
  }
};

print();
