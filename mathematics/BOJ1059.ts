// 1059: 좋은 구간
import { readFileSync } from "fs";

const [[l], S, [n]] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

const print = () => console.log(solve().toString());

const solve = () => {
  S.sort((a, b) => a - b);
  S.unshift(0);
  const opt = optimize();
  if (S[opt] === n) return 0;
  return (S[opt] - n) * (n - S[opt - 1]) - 1;
};

const optimize = () => {
  let lo = -1,
    hi = l;
  while (lo + 1 < hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (S[mid] >= n) hi = mid;
    else lo = mid;
  }
  return hi;
};

print();
