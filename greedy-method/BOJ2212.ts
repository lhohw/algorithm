// 2212: 센서
import { readFileSync } from "fs";

const [, [k], sensors] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

const solve = () => {
  const sortedSensors = Array.from(new Set(sensors)).sort((a, b) => a - b);
  const n = sortedSensors.length;
  const gap: number[] = [];
  for (let i = 1; i < n; i++) {
    gap.push(sortedSensors[i] - sortedSensors[i - 1]);
  }
  gap.sort((a, b) => a - b);
  for (let i = 0; i < k - 1 && gap.length; i++) gap.pop();
  return gap.reduce((x, y) => x + y, 0);
};

console.log(solve().toString());
