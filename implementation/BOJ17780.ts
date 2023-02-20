// 17780: 새로운 게임
import { createInterface } from "readline";

type Horse = {
  y: number;
  x: number;
  d: number;
};
type Cell = {
  color: number;
  horses: number[];
};
let n: number, k: number;
const board: Cell[][] = [];
const horses: Horse[] = [];
const dy = [0, 0, -1, 1];
const dx = [1, -1, 0, 0];
const reverse = [1, 0, 3, 2];
let i = 0;
const play = () => {
  for (let i = 0; i < k; i++) {
    if (move(i) >= 4) return true;
  }
  return false;
};
const move = (idx: number, recur = false): number => {
  const { y, x, d } = horses[idx];
  if (board[y][x].horses[0] !== idx) return 0;
  const ny = y + dy[d];
  const nx = x + dx[d];
  if (isOut(ny, nx) || board[ny][nx].color === 2) {
    if (recur) return 0;
    horses[idx].d = reverse[d];
    return move(idx, true);
  }
  if (board[ny][nx].color === 0) board[y][x].horses.reverse();
  while (board[y][x].horses.length) {
    const idx = board[y][x].horses.pop()!;
    horses[idx].y = ny;
    horses[idx].x = nx;
    board[ny][nx].horses.push(idx);
  }
  return board[ny][nx].horses.length;
};
const isOut = (y: number, x: number) => y < 0 || y >= n || x < 0 || x >= n;
const solve = () => {
  let ret = 1;
  while (!play() && ret <= 1000) ret++;
  if (ret === 1001) return -1;
  return ret;
};
createInterface({
  input: process.stdin,
  output: process.stdout,
})
  .on("line", (input) => {
    if (n === undefined || k === undefined) {
      [n, k] = input.split(" ").map(Number);
    } else if (n) {
      board.push(
        input.split(" ").map((color) => ({ color: +color, horses: [] }))
      );
      n--;
    } else if (i !== k) {
      const [y, x, d] = input.split(" ").map((e) => +e - 1);
      const horse = { y, x, d };
      horses.push(horse);
      board[y][x].horses.push(i);
      i++;
    }
  })
  .on("close", () => {
    n = board.length;
    console.log(solve().toString());
    process.exit();
  });
