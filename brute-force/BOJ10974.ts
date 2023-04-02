// 10974: 모든 순열
import { readFileSync } from "fs";

const n = +readFileSync("/dev/stdin").toString().trim();
let ret = "";

const makeSequence = (array: number[], visited: number) => {
  if (array.length === n) {
    ret += array.join(" ") + "\n";
    return;
  }
  for (let i = 0; i < n; i++) {
    if (visited & (1 << i)) continue;
    array.push(i + 1);
    makeSequence(array, visited | (1 << i));
    array.pop();
  }
};

makeSequence([], 0);
console.log(ret.trimEnd());
