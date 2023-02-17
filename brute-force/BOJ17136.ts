// 17136: 색종이 붙이기
import { readFileSync } from "fs";

const board = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));
const n = board.length;
const visited = new Array(n).fill(undefined).map(() => new Array(n).fill(0));
const coloredPaper = new Array(6).fill(5);
let ret = Infinity;
const init = () => {
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      if (board[y][x] === 0 || y === 0 || x === 0) continue;
      board[y][x] =
        Math.min(board[y - 1][x], board[y][x - 1], board[y - 1][x - 1]) + 1;
    }
  }
};
const cover = (y: number, x: number, w: number, flag: number) => {
  let f = true;
  for (let i = 0; i < w; i++) {
    for (let j = 0; j < w; j++) {
      if (visited[y - i][x - j]) f = false;
      visited[y - i][x - j] += flag;
    }
  }
  return f;
};
const attach = (y: number, x: number, count: number) => {
  if (count >= ret) return;
  if (y === -1) {
    ret = Math.min(ret, count);
    return;
  }
  if (x === -1) {
    attach(y - 1, n - 1, count);
    return;
  }
  const width = board[y][x];
  if (width === 0 || visited[y][x]) {
    attach(y, x - 1, count);
    return;
  }
  for (let w = Math.min(5, width); w >= 1; w--) {
    if (coloredPaper[w] === 0) continue;
    coloredPaper[w]--;
    if (cover(y, x, w, 1)) attach(y, x - 1, count + 1);
    cover(y, x, w, -1);
    coloredPaper[w]++;
  }
  return ret;
};

const solve = () => {
  init();
  attach(n - 1, n - 1, 0);
  if (ret === Infinity) return -1;
  return ret;
};

console.log(solve().toString());
