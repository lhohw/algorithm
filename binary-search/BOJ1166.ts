// 1166: 선물
import { readFileSync } from "fs";

const [n, ...lengths] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(" ")
  .map(Number);
const min = Math.min(...lengths);

const print = () => console.log(solve().toString());

const solve = () => {
  const ret = optimize();
  return ret.toFixed(9);
};

const optimize = () => {
  let lo = 0,
    hi = min;
  for (let i = 0; i < 200; i++) {
    const mid = (lo + hi) / 2;
    if (decision(mid)) lo = mid;
    else hi = mid;
  }
  return hi;
};

const decision = (A: number) => {
  return lengths.reduce((acc, length) => acc * Math.floor(length / A), 1) >= n;
};

print();
