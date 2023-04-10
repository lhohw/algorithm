// 17127: 벚꽃이 정보섬에 피어난 이유
import { readFileSync } from "fs";

const [[n], cherryBlossom] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));
const prefixMultiply = [0, ...cherryBlossom];
for (let i = 2; i <= n; i++) prefixMultiply[i] *= prefixMultiply[i - 1];
const choices = new Array(n - 1).fill(undefined).map((_, i) => i + 1);
let ret = 0;

const select = (array: number[], idx: number) => {
  if (array.length === 3) {
    calculate(array);
    return;
  }
  for (let i = idx; i < choices.length; i++) {
    array.push(choices[i]);
    select(array, i + 1);
    array.pop();
  }
};

const calculate = (array: number[]) => {
  let sum = 0;
  let prev = 0;
  for (const idx of array.concat(n)) {
    sum += prefixMultiply[idx] / Math.max(1, prefixMultiply[prev]);
    prev = idx;
  }
  ret = Math.max(ret, sum);
};

select([], 0);
console.log(ret.toString());
