// 1057: 토너먼트
import { readFileSync } from "fs";

const [, l, k] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(" ")
  .map((e) => +e - 1);

const print = () => console.log(solve().toString());

const solve = () => {
  let round = 1;
  while (!isSameGroup(l, k, round)) round++;
  return round;
};

const isSameGroup = (l: number, k: number, round: number) => {
  const unit = 1 << round;
  return Math.floor(l / unit) === Math.floor(k / unit);
};

print();
