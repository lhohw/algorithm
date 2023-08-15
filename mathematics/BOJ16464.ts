// 16464: 가주아
import { readFileSync } from "fs";

const [, ...ks] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map(Number);

const print = () => console.log(solve());

const solve = () => {
  return ks.map((k) => (k ^ (k & -k) ? "Gazua" : "GoHanGang")).join("\n");
};

print();
