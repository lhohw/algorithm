// 16918: 봄버맨
import { createInterface } from "readline";

const handleInput = (input: string) => {
  if (n === undefined || m === undefined || t === undefined) init(input);
  else addRow(input);
};

const init = (input: string) => {
  [n, m, t] = input.split(" ").map(Number);
  board = [];
};

const addRow = (input: string) => {
  board.push(input.split("").map((e) => (e === "." ? 0 : 2)));
};

const print = () => console.log(solve());

const solve = () => {
  t--;
  let flag = true;
  while (t) {
    if (flag) install();
    else bomb();
    flag = !flag;
    t--;
  }
  return board
    .map((row) => row.map((e) => (e === 0 ? "." : "O")).join(""))
    .join("\n");
};

const install = () => {
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < m; x++) {
      if (board[y][x] === 0) board[y][x] = 3;
      else board[y][x]--;
    }
  }
};

const bomb = () => {
  const tmp = board.map((row) => [...row]);
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < m; x++) {
      board[y][x]--;
      tmp[y][x] = Math.max(tmp[y][x] - 1, 0);
      if (board[y][x] === 0) {
        tmp[y][x] = 0;
        for (let d = 0; d < 4; d++) {
          const ny = y + dy[d];
          const nx = x + dx[d];
          if (isOut(ny, nx)) continue;
          tmp[ny][nx] = 0;
        }
      }
    }
  }
  copy(tmp);
};

const copy = (tmp: number[][]) => {
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < m; x++) {
      board[y][x] = tmp[y][x];
    }
  }
};
const isOut = (y: number, x: number) => y < 0 || y >= n || x < 0 || x >= m;

let n: number, m: number, t: number;
let board: number[][];
const dy = [-1, 0, 1, 0];
const dx = [0, 1, 0, -1];
createInterface({
  input: process.stdin,
  output: process.stdout,
})
  .on("line", handleInput)
  .on("close", () => {
    print();
    process.exit();
  });
