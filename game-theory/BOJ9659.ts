// 9659: 돌 게임 5
import { readFileSync } from "fs";

const n = BigInt(readFileSync("/dev/stdin").toString().trim());

const solve = (n: bigint) => {
  if (n % BigInt(2)) return "SK";
  return "CY";
};

console.log(solve(n));
