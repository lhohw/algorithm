// 20057: 마법사 상어와 토네이도
import { readFileSync } from "fs";

const [[n], ...board] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));
const ratio = [0.02, 0.1, 0.07, 0.01, 0.05, 0.1, 0.07, 0.01, 0.02];
const sy = [
  [0, -1, 0, 1, -2, -1, 0, 1, 0, -1],
  [-2, -1, -1, -1, 0, 1, 1, 1, 2, 0],
  [0, 1, 0, -1, 2, 1, 0, -1, 0, 1],
  [-2, -1, -1, -1, 0, 1, 1, 1, 2, 0],
];
const sx = [
  [2, 1, 1, 1, 0, -1, -1, -1, -2, 0],
  [0, 1, 0, -1, 2, 1, 0, -1, 0, 1],
  [-2, -1, -1, -1, 0, 1, 1, 1, 2, 0],
  [0, -1, 0, 1, -2, -1, 0, 1, 0, -1],
];
const dy = [-1, 0, 1, 0];
const dx = [0, 1, 0, -1];
const blow = (pos: number[], d: number) => {
  const [y, x] = pos;
  const sand = board[y][x];
  board[y][x] = 0;
  let ret = 0;
  let total = 0;
  for (let i = 0; i < 10; i++) {
    const ny = y + sy[d][i];
    const nx = x + sx[d][i];
    const blowed = i === 9 ? sand - total : Math.floor(sand * ratio[i]);
    total += blowed;
    if (ny < 0 || ny >= n || nx < 0 || nx >= n) ret += blowed;
    else board[ny][nx] += blowed;
  }
  return ret;
};
let here = [Math.floor(n / 2), Math.floor(n / 2)];
let ret = 0;
let d = 3;
let dist = 1;
let iter = 0;
while (!(here[0] === 0 && here[1] === 0)) {
  for (let _dist = 0; _dist < dist; _dist++) {
    here = [here[0] + dy[d], here[1] + dx[d]];
    ret += blow(here, d);
  }
  d = (d - 1 + 4) % 4;
  iter++;
  if (iter === 2 * n - 2) continue;
  if (iter % 2 === 0) dist++;
}
console.log(ret.toString());
