// 1256: 사전
import { readFileSync } from "fs";

const [n, m, k] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(" ")
  .map(Number);
const cache = Array.from({ length: 201 }).map<bigint[]>(() =>
  new Array(201).fill(BigInt(1))
);

const print = () => console.log(solve());

const solve = () => {
  init();
  const max = combination(n + m, n);
  if (max < k) return "-1";
  return findString(n, m);
};

const init = () => {
  for (let i = 2; i <= 200; i++) {
    for (let j = 1; j < i; j++) {
      cache[i][j] = cache[i - 1][j - 1] + cache[i - 1][j];
    }
  }
};

const combination = (n: number, r: number): bigint => {
  if (n === 0) return BigInt(0);
  return cache[n][r];
};

const findString = (n: number, m: number) => {
  const total = n + m;
  let kth = BigInt(k);
  let ret = "";
  for (let i = 0; i < total; i++) {
    if (n === 0) {
      ret += "z";
      m--;
      continue;
    }

    const cases = combination(n + m - 1, n - 1);
    if (m === 0 || kth <= cases) {
      ret += "a";
      n--;
    } else {
      ret += "z";
      m--;
      kth -= cases;
    }
  }
  return ret;
};

print();
