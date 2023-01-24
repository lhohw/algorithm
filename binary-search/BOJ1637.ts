// 1637: 날카로운 눈
import { readFileSync } from "fs";

const [, ...input] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));
const MAX = 2147483647;

const sum = (num: number) => {
  let ret = 0;
  for (const [a, c, b] of input) {
    if (a > num) continue;
    ret += 1 + Math.floor((Math.min(num, c) - a) / b);
  }
  return ret;
};
const decision = (num: number) => {
  const s = sum(num);
  return s % 2;
};
const optimize = () => {
  let lo = 0,
    hi = MAX + 1;
  while (lo + 1 < hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (decision(mid)) hi = mid;
    else lo = mid;
  }
  return hi;
};
const solve = () => {
  const Z = optimize();
  if (Z === MAX + 1) return "NOTHING";
  return `${Z} ${sum(Z) - sum(Z - 1)}`;
};

console.log(solve());
