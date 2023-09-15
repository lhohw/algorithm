// 1788: 피보나치 수의 확장
import { readFileSync } from "fs";

const n = +readFileSync("/dev/stdin").toString().trim();
const MOD = 1e9;

const print = () => console.log(solve());

const solve = () => {
  const sign = getSign(n);
  const ret = fibonacci(Math.abs(n));
  return `${sign}\n${ret}`;
};

const getSign = (n: number) => {
  if (n === 0) return 0;
  if (n < 0 && Math.abs(n) % 2 === 0) return -1;
  return 1;
};

const fibonacci = (n: number) => {
  if (n === 0) return 0;
  if (n === 1) return 1;
  let prev2 = 0;
  let prev1 = 1;
  for (let i = 1; i < n; i++) {
    const cur = (prev2 + prev1) % MOD;
    prev2 = prev1;
    prev1 = cur;
  }
  return prev1;
};

print();
