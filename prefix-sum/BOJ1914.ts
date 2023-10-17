// 1914: 하노이 탑
import { readFileSync } from "fs";

const n = +readFileSync("/dev/stdin").toString().trim();
let ret = "";
let i = 0;

const print = () => console.log(solve());

const solve = () => {
  const cache = precalc();
  const count = cache[n];

  ret = `${count}\n`;
  if (n <= 20) hanoi(n, 0, 1, 2);
  return ret.trimEnd();
};

const precalc = () => {
  const count: bigint[] = new Array(n + 1).fill(BigInt(1));
  for (let i = 2; i <= n; i++) {
    count[i] = count[i - 1] * BigInt(2) + BigInt(1);
  }
  return count;
};

const hanoi = (count: number, from: number, via: number, to: number) => {
  if (count === 0) return;

  i++;
  if (i % 10000 === 0) {
    process.stdout.write(ret);
    ret = "";
    i = 0;
  }
  hanoi(count - 1, from, to, via);
  ret += `${from + 1} ${to + 1}\n`;
  hanoi(count - 1, via, from, to);
};

print();
