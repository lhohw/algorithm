// 17626: Four Squares
import { readFileSync } from "fs";

const n = +readFileSync("/dev/stdin").toString().trim();

const solve = (n: number) => {
  const sqrtN = Math.sqrt(n);
  if (sqrtN === Math.floor(sqrtN)) return 1;
  const dp = new Array(n + 1).fill(undefined).map((_, i) => i);
  for (let i = 2; i <= sqrtN; i++) {
    const square = i ** 2;
    for (let j = square; j <= n; j++) {
      dp[j] = Math.min(dp[j], 1 + dp[j - square]);
    }
  }
  return dp[n];
};

console.log(solve(n).toString());
