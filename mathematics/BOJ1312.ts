// 1312: 소수
import { readFileSync } from "fs";

const [A, B, N] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(" ")
  .map(Number);

const print = () => console.log(solve(A, B, N).toString());

const solve = (A: number, B: number, N: number) => {
  A -= B * Math.floor(A / B);
  const map = new Map<number, number>();
  let minority = "";
  let iter = 0;
  while (iter < N) {
    if (A === 0) return 0;
    if (map.has(A)) {
      const idx = map.get(A)!;
      const recur = minority.slice(idx);
      return recur[(N - 1) % recur.length];
    }
    map.set(A, iter);
    A *= 10;
    const v = Math.floor(A / B);
    A -= B * v;
    minority += v;
    iter++;
  }
  return minority[N - 1];
};

print();
