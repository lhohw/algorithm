// 1092: 배
import { readFileSync } from "fs";

const [[n], limits, , weights] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

const print = () => console.log(solve().toString());

const solve = () => {
  init();
  if (isImpossible()) return -1;
  const time = load();
  return time;
};

const init = () => {
  limits.sort((a, b) => b - a);
  weights.sort((a, b) => a - b);
};

const isImpossible = () => {
  const limitMax = limits[0];
  const weightMax = weights[weights.length - 1];
  return limitMax < weightMax;
};

const load = () => {
  let time = 0;
  let crane = 0;
  while (weights.length) {
    if (crane === 0) time++;
    const limit = limits[crane];
    const target = optimize(limit);
    if (target !== -1) weights.splice(target, 1);
    crane = (crane + 1) % n;
  }
  return time;
};

const optimize = (limit: number) => {
  let lo = -1,
    hi = weights.length;
  while (lo + 1 < hi) {
    const mid = (lo + hi) >> 1;
    if (weights[mid] <= limit) lo = mid;
    else hi = mid;
  }
  return lo;
};

print();
