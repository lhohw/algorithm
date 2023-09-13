// 1947: 선물 전달
import { readFileSync } from "fs";

const n = +readFileSync("/dev/stdin").toString().trim();
const MOD = 1e9;

const print = () => console.log(solve().toString());

const solve = () => {
  if (n === 1) return 0;
  if (n === 2) return 1;
  let prev2 = 0;
  let prev1 = 1;
  for (let i = 2; i < n; i++) {
    const cur = (i * (prev2 + prev1)) % MOD;
    prev2 = prev1;
    prev1 = cur;
  }
  return prev1;
};

print();
