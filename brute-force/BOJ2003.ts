// 2003: 수 들의 합 2
import { readFileSync } from "fs";

const [[n, m], A] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

const print = () => console.log(solve().toString());

const solve = () => {
  let ret = 0;
  let sum = 0;
  let left = 0;
  for (let i = 0; i < n; i++) {
    sum += A[i];
    while (sum > m) sum -= A[left++];
    if (sum === m) ret++;
  }
  return ret;
};

print();
