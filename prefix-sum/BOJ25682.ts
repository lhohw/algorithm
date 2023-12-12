// 25682: 체스판 다시 칠하기 2
import { readFileSync } from "fs";

const [values, ...board] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const [n, m, k] = values.split(" ").map(Number);

const print = () => console.log(solve().toString());

const solve = () => {
  let ret = 1 << 30;
  const total = k ** 2;
  const partialSum = Array.from({ length: n }).map(() => new Array(m).fill(0));
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < m; x++) {
      const target = (y + x) % 2 === 0 ? "B" : "W";
      partialSum[y][x] =
        Number(shouldPaint(target, y, x)) +
        getPartialSum(partialSum, y, x, 1, true);
      if (isEnoughLength(y, x, k)) {
        const cand = getPartialSum(partialSum, y, x, k, false);
        ret = Math.min(ret, cand, total - cand);
      }
    }
  }

  return ret;
};

const getPartialSum = (
  partialSum: number[][],
  y: number,
  x: number,
  diff: number,
  isInitialize: boolean
) => {
  const w = isInitialize ? 1 : -1;
  return (
    partialSum[y][x] +
    w *
      (getValue(partialSum, y - diff, x) +
        getValue(partialSum, y, x - diff) -
        getValue(partialSum, y - diff, x - diff))
  );
};

const getValue = (partialSum: number[][], y: number, x: number) =>
  y >= 0 && x >= 0 ? partialSum[y][x] : 0;

const shouldPaint = (target: string, y: number, x: number) =>
  target !== board[y][x];

const isEnoughLength = (y: number, x: number, k: number) =>
  y >= k - 1 && x >= k - 1;

print();
