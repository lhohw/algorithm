// 2580: 스도쿠
import { readFileSync } from "fs";

type Blank = {
  y: number;
  x: number;
  area: number;
};
const n = 9;
const board = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));
const rows = new Array(n).fill((1 << n) - 1);
const cols = new Array(n).fill((1 << n) - 1);
const areas = new Array(n).fill((1 << n) - 1);
const blanks: Blank[] = [];
let ret = "";
const init = () => {
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      const value = board[y][x] - 1;
      const area = Math.floor(y / 3) * 3 + Math.floor(x / 3);
      if (value === -1) {
        blanks.push({ y, x, area });
        continue;
      }
      rows[y] -= 1 << value;
      cols[x] -= 1 << value;
      areas[area] -= 1 << value;
    }
  }
};
const set = (blank: Blank, cand: number, flag: -1 | 1) => {
  const { y, x, area } = blank;
  const value = flag === -1 ? Math.log2(cand) + 1 : 0;
  board[y][x] = value;
  cand *= flag;
  rows[y] += cand;
  cols[x] += cand;
  areas[area] += cand;
};
const play = (idx: number) => {
  if (ret) return;
  if (idx === blanks.length) {
    ret = board.map((row) => row.join(" ")).join("\n");
    return;
  }
  const blank = blanks[idx];
  const { y, x, area } = blank;
  let bit = rows[y] & cols[x] & areas[area];
  while (bit) {
    const cand = bit & -bit;
    set(blank, cand, -1);
    play(idx + 1);
    if (ret) return;
    set(blank, cand, 1);
    bit &= ~cand;
  }
};
const solve = () => {
  init();
  play(0);
  return ret;
};

console.log(solve());
