// 20116: 상자의 균형
import { readFileSync } from "fs";

const [[n, l], xs] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

const print = () => console.log(solve());

const solve = () => {
  const isStable = calculate();
  if (isStable) return "stable";
  return "unstable";
};

const calculate = () => {
  let sum = 0;
  let count = 0;
  for (let i = n - 1; i; i--) {
    const x = xs[i];
    sum += x;
    count++;
    const avg = sum / count;
    if (!isIncluded(xs[i - 1], avg)) return false;
  }
  return true;
};

const isIncluded = (x: number, avg: number) => {
  const min = x - l;
  const max = x + l;
  return min < avg && avg < max;
};

print();
