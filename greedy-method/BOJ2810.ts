// 2810: 컵홀더
import { readFileSync } from "fs";

const [n, s] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row, i) => (i === 0 ? +row : row)) as [number, string];

console.log(Math.min(n, s.split(/S|LL/g).length).toString());
