// 2688: 줄어들지 않아
import { readFileSync } from "fs";

const [, ...numbers] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map(Number);
const cache: bigint[][] = Array.from({ length: 65 })
  .fill(undefined)
  .map(() => new Array(10).fill(BigInt(1)));
const sum: bigint[] = new Array(65).fill(BigInt(1));

const print = () => console.log(solve());

const solve = () => {
  init();
  return numbers.map((digit) => sum[digit]).join("\n");
};

const init = () => {
  sum[1] = BigInt(10);
  for (let digit = 2; digit <= 64; digit++) {
    let prevSum = sum[digit - 1];
    let nextSum = BigInt(0);
    for (let num = 0; num < 10; num++) {
      cache[digit][num] = prevSum;
      nextSum += prevSum;
      prevSum -= cache[digit - 1][num];
    }
    sum[digit] = nextSum;
  }
};

print();
