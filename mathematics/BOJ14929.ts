// 14929: 귀찮아(SIB)
import { readFileSync } from "fs";

const [, xi] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(BigInt));

const print = () => console.log(solve().toString());

const solve = () => {
  let ret = BigInt(0);
  let sum = xi.reduce((acc, x) => acc + x);
  for (const x of xi) {
    sum -= x;
    ret += x * sum;
  }
  return ret;
};

print();
