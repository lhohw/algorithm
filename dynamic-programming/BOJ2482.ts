// 2482: 색상환
import { readFileSync } from "fs";

const [n, k] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map(Number);
const mod = 1e9 + 3;

const solve = (n: number, k: number) => {
  if (n / k < 2) return 0;
  if (n / k === 2) return 2;
  const cache = new Array(2)
    .fill(undefined)
    .map((_, i) =>
      new Array(n + 1).fill(undefined).map((_, j) => (i === 0 ? 1 : j))
    );

  for (let i = 2; i <= k; i++) {
    cache[i % 2][2 * i - 1] = 1;
    for (let j = 2 * i; j <= n; j++) {
      cache[i % 2][j] = (cache[i % 2][j - 1] + cache[(i + 1) % 2][j - 2]) % mod;
    }
  }
  return (cache[(k + 1) % 2][n - 3] + cache[k % 2][n - 1]) % mod;
};

console.log(solve(n, k).toString());
