// 2230: 수 고르기
import { readFileSync } from "fs";

const [[n, m], ...seq] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row, i) => (i === 0 ? row.split(" ").map(Number) : +row)) as [
  number[],
  ...number[]
];

const print = () => console.log(solve().toString());

const solve = () => {
  if (m === 0) return 0;

  seq.sort((a, b) => a - b);

  let ret = Infinity;
  let left = 0,
    right = 0;
  while (left < n && right < n) {
    if (left === right) {
      right++;
      continue;
    }
    const cand = seq[right] - seq[left];
    if (cand >= m) {
      ret = Math.min(cand, ret);
      left++;
      continue;
    }
    right++;
  }
  return ret;
};

print();
