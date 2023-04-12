// 17276: 배열 돌리기
import { createInterface } from "readline";

const handleInput = (input: string) => {
  if (t === undefined) setT(input);
  else if (n === undefined || d === undefined) setND(input);
  else if (n) addRow(input);
};

const setT = (input: string) => (t = +input);
const setND = (input: string) => {
  [n, d] = input.split(" ").map(Number);
  setPos(n);
  board = [];
};
const setPos = (n: number) => {
  const gap = Math.floor(n / 2);
  pos = [
    [0, 0],
    [0, gap],
    [0, gap * 2],
    [gap, gap * 2],
    [gap * 2, gap * 2],
    [gap * 2, gap],
    [gap * 2, 0],
    [gap, 0],
  ];
};
const addRow = (input: string) => {
  n--;
  const row = input.split(" ").map(Number);
  board.push(row);
  if (n === 0) {
    n = board.length;
    ret += solve() + "\n";
    cleanUp();
  }
};

const solve = () => {
  d %= 360;
  let sign = Math.sign(d);
  if (Math.abs(d) > 180) {
    sign = -Math.sign(d);
    d = 360 - Math.abs(d);
  } else d = Math.abs(d);

  rotate(sign, d / 45);
  return board.map((row) => row.join(" ")).join("\n");
};

const rotate = (sign: number, iter: number) => {
  if (iter === 0) return;
  const tmp = board.map((row) => [...row]);
  for (let i = 0; i < 4; i++) {
    let [y, x] = pos[i];
    let [ty, tx] = pos[(i + sign * iter + 8) % 8];
    while (!isOut(y, x)) {
      tmp[ty][tx] = board[y][x];
      y += dy[i];
      x += dx[i];
      ty += dy[(i + sign * iter + 8) % 8];
      tx += dx[(i + sign * iter + 8) % 8];
    }
  }
  clone(tmp);
};

const isOut = (y: number, x: number) => y < 0 || y >= n || x < 0 || x >= n;

const clone = (tmp: number[][]) => {
  for (let d = 0; d < 4; d++) {
    let [y, x] = pos[d];
    while (!isOut(y, x)) {
      board[y][x] = tmp[y][x];
      y += dy[d];
      x += dx[d];
    }
  }
};

const cleanUp = () => {
  [n, d, board, pos] = new Array(4).fill(undefined);
};

let t: number;
let n: number, d: number;
let board: number[][];
let ret = "";
let pos: number[][];
const dy = [1, 1, 1, 0, -1, -1, -1, 0];
const dx = [1, 0, -1, -1, -1, 0, 1, 1];

createInterface({
  input: process.stdin,
  output: process.stdout,
})
  .on("line", handleInput)
  .on("close", () => {
    console.log(ret.trimEnd());
    process.exit();
  });
