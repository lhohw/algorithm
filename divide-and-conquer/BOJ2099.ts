// 2099: The game of death
import { createInterface } from "readline";

type Matrix = number[][];
const handleInput = (input: string) => {
  if (n === undefined || k === undefined || m === undefined) {
    init(input);
  } else if (i !== n) {
    pointOut(input, i);
    i++;
    if (i === n) matrix = precalc(k);
  } else {
    ret += `${theGameOfDeath(input)}\n`;
  }
};

const init = (input: string) => {
  [n, k, m] = input.split(" ").map(Number);
  A = new Array(n).fill(undefined).map(() => new Array(n).fill(0));
};

const pointOut = (input: string, idx: number) => {
  const [u, v] = toIdx(input);
  A[idx][u] = 1;
  A[idx][v] = 1;
};

const precalc = (k: number): Matrix => {
  if (k === 1) return A;
  if (k % 2) return multiply(A, precalc(k - 1));
  const half = precalc(k / 2);
  return multiply(half, half);
};

const multiply = (m1: Matrix, m2: Matrix) => {
  const m: Matrix = new Array(n)
    .fill(undefined)
    .map(() => new Array(n).fill(0));
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      m[y][x] = m1[y].reduce((acc, v, i) => acc | (v & m2[i][x]), 0);
    }
  }
  return m;
};

const theGameOfDeath = (input: string) => {
  const [u, v] = toIdx(input);
  return matrix[u][v] ? "death" : "life";
};

const toIdx = (input: string) => input.split(" ").map((e) => +e - 1);

const print = () => console.log(ret.trimEnd());

let n: number,
  k: number,
  m: number,
  i = 0;
let A: Matrix;
let matrix: Matrix;
let ret = "";

createInterface({
  input: process.stdin,
  output: process.stdout,
})
  .on("line", handleInput)
  .on("close", () => {
    print();
    process.exit();
  });
