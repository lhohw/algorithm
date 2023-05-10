// 18430: 무기 공학
import { readFileSync } from "fs";

type State = {
  mask: number;
  value: number;
};
const [[n, m], ...woods] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

const precalc: State[][][] = new Array(n).fill(undefined).map(() =>
  new Array(m).fill(undefined).map(() =>
    new Array(4).fill(undefined).map(() => ({
      mask: 0,
      value: 0,
    }))
  )
);
const coordToMask = new Array(n)
  .fill(undefined)
  .map((_, y) => new Array(m).fill(undefined).map((_, x) => 1 << (y * m + x)));
const dy = [0, 0, 1, 1];
const dx = [0, 1, 1, 0];

const print = () => console.log(solve().toString());

const solve = () => {
  init();
  return makeBoomerang(0, 0);
};

const init = () => {
  for (let y = 0; y < n - 1; y++) {
    for (let x = 0; x < m - 1; x++) {
      let mask = 0;
      let value = 0;
      for (let d = 0; d < 4; d++) {
        const ny = y + dy[d];
        const nx = x + dx[d];
        mask = mask | coordToMask[ny][nx];
        value += woods[ny][nx];
      }
      for (let d = 0; d < 4; d++) {
        const ny = y + dy[d];
        const nx = x + dx[d];
        const opY = y + dy[(d + 2) % 4];
        const opX = x + dx[(d + 2) % 4];
        precalc[y][x][d].mask = mask ^ coordToMask[opY][opX];
        precalc[y][x][d].value = value - woods[opY][opX] + woods[ny][nx];
      }
    }
  }
};

const makeBoomerang = (board: number, i: number): number => {
  if (i === (n - 1) * m) return 0;
  const y = Math.floor(i / m);
  const x = i % m;
  if (x === m - 1) return makeBoomerang(board, i + 1);
  if (last2RowEmpty(y, board)) return 0;
  let ret = makeBoomerang(board, i + 1);
  for (let idx = 0; idx < 4; idx++) {
    const { mask, value } = precalc[y][x][idx];
    if (board & mask) continue;
    ret = Math.max(ret, value + makeBoomerang(board | mask, i + 1));
  }
  return ret;
};

const last2RowEmpty = (y: number, board: number) => {
  if (y < 2) return false;
  return ((board >> ((y - 2) * m)) & ((1 << (y * m)) - 1)) === 0;
};

print();
