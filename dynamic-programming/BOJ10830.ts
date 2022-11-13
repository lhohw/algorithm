// 10830: 행렬 제곱
import { readFileSync } from "fs";

const [[n, b], ...matrix] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

type Matrix = typeof matrix;
const multiply = (m1: Matrix, m2: Matrix): Matrix => {
  const ret = new Array(n).fill(undefined).map(() => new Array(n).fill(0));
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      for (let i = 0; i < n; i++) {
        ret[y][x] = (ret[y][x] + m1[y][i] * m2[i][x]) % 1000;
      }
    }
  }
  return ret;
};

const cache = new Array(Math.ceil(Math.log2(b)) + 1).fill(undefined);
const solve = (b: number): Matrix => {
  if (b === 1) return matrix;
  if (cache[b] !== undefined) return cache[b];
  if (b % 2 === 1) return multiply(solve(b - 1), matrix);
  const half = solve(b / 2);
  return (cache[Math.log2(b)] = multiply(half, half));
};

solve(b).forEach((row) => console.log(row.map((e) => e % 1000).join(" ")));
