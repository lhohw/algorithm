// 7453: 합이 0인 네 정수
import { readFileSync } from "fs";

const [[n], ...array] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

const map = new Map();
for (let i = 0; i < n; i++) {
  const num = array[i][0];
  for (let j = 0; j < n; j++) {
    const value = -(num + array[j][1]);
    map.set(value, (map.get(value) || 0) + 1);
  }
}
let ret = 0;
for (let i = 0; i < n; i++) {
  const num = array[i][2];
  for (let j = 0; j < n; j++) {
    const value = num + array[j][3];
    if (map.has(value)) ret += map.get(value);
  }
}

console.log(ret.toString());
