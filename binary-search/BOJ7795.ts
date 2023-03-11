// 7795: 먹을 것인가 먹힐 것인가
import { createInterface } from "readline";

let t: number;
let n: number, m: number;
let A: number[], B: number[];
let ret = "";
const optimize = (value: number) => {
  let lo = -1,
    hi = m;
  while (lo + 1 < hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (value <= B[mid]) hi = mid;
    else lo = mid;
  }
  return hi;
};
const solve = () => {
  B.sort((a, b) => a - b);
  let ret = 0;
  for (const value of A) {
    ret += optimize(value);
  }
  return ret;
};
createInterface({
  input: process.stdin,
  output: process.stdout,
})
  .on("line", (input) => {
    if (t === undefined) t = +input;
    else if (n === undefined || m === undefined) {
      [n, m] = input.split(" ").map(Number);
    } else if (A === undefined) {
      A = input.split(" ").map(Number);
    } else if (B === undefined) {
      B = input.split(" ").map(Number);
      ret += solve() + "\n";
      [n, m, A, B] = new Array(4).fill(undefined);
    }
  })
  .on("close", () => {
    console.log(ret.trimEnd());
    process.exit();
  });
