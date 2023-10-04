// 16435: 스네이크버드
import { readFileSync } from "fs";

const [[, l], fruits] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

const print = () => console.log(solve().toString());

const solve = () => {
  sort();
  return getMaxLength();
};

const sort = () => {
  fruits.sort((a, b) => a - b);
};

const getMaxLength = () => {
  let cnt = 0;
  while (l + cnt >= fruits[cnt]) cnt++;
  return l + cnt;
};

print();
