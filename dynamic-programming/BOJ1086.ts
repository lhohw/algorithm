// 1086: 박성원
import { readFileSync } from "fs";

const input = readFileSync("/dev/stdin").toString().trim().split("\n");
const n = +input.shift()!;
const k = +input.pop()!;
const remainders: number[] = new Array(n).fill(0);
const cache: number[][] = new Array(1 << 15)
  .fill(undefined)
  .map(() => new Array(101).fill(-1));
const p: number[] = new Array(51).fill(undefined);
p[0] = 1 % k;
for (let i = 1; i < 51; i++) p[i] = (p[i - 1] * 10) % k;

for (let i = 0; i < n; i++) {
  let remainder = 0;
  for (let j = 0; j < input[i].length; j++) {
    remainder = (remainder * 10) % k;
    remainder = (remainder + +input[i][j]) % k;
  }
  remainders[i] = remainder;
}

const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));

const dfs = (visited: number, remainder: number) => {
  if (visited === (1 << n) - 1) return Number(!remainder);
  if (cache[visited][remainder] !== -1) return cache[visited][remainder];
  let ret = 0;
  for (let i = 0; i < n; i++) {
    if (visited & (1 << i)) continue;
    const nextRemainder = (remainder * p[input[i].length] + remainders[i]) % k;
    ret += dfs(visited | (1 << i), nextRemainder);
  }
  return (cache[visited][remainder] = ret);
};

const factorial = (n: number): number => n * (n === 1 ? 1 : factorial(n - 1));

const solve = () => {
  const ret = dfs(0, 0);
  if (ret === 0) return "0/1";
  const f = factorial(n);
  const GCD = gcd(ret, f);
  return `${ret / GCD}/${f / GCD}`;
};

console.log(solve());
