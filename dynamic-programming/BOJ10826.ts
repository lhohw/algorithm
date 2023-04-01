// 10826: 피보나치 수 4
import { readFileSync } from "fs";

const n = +readFileSync("/dev/stdin").toString().trim();

const print = () => console.log(solve().toString());

const solve = () => {
  if (n <= 1) return n;
  let prev2 = BigInt(0),
    prev1 = BigInt(1);
  let ret = BigInt(1);
  for (let i = 2; i <= n; i++) {
    ret = prev2 + prev1;
    prev2 = prev1;
    prev1 = ret;
  }
  return ret;
};

print();
