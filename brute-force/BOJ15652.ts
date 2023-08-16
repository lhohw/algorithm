// 15652: N과 M(4)
import { readFileSync } from "fs";

const [n, m] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(" ")
  .map(Number);
let ret = "";

const print = () => console.log(solve());

const solve = () => {
  makeSequence([], 1);
  return ret.trimEnd();
};

const makeSequence = (array: number[], start: number) => {
  if (array.length === m) {
    ret += array.join(" ") + "\n";
    return;
  }
  for (let i = start; i <= n; i++) {
    array.push(i);
    makeSequence(array, i);
    array.pop();
  }
};

print();
