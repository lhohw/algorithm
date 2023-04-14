// 2072: 오목
import { createInterface } from "readline";

const handleInput = (input: string) => {
  if (n === undefined) init(input);
  else if (ret === -1) put(input, ++i % 2);
};

const init = (input: string) => {
  n = +input;
  board = new Array(n).fill(undefined).map(() => new Array(n).fill(undefined));
};

const put = (input: string, turn: number) => {
  const [y, x] = input.split(" ").map((e) => +e - 1);
  board[y][x] = turn;
  if (isEnd(y, x)) ret = i;
};

const isEnd = (y: number, x: number) => {
  return checkHorizontal(y, x) || checkVertical(y, x) || checkDiagonal(y, x);
};

const checkHorizontal = (y: number, x: number) => {
  return checkLine(y, x, 0, 1);
};

const checkVertical = (y: number, x: number) => {
  return checkLine(y, x, 1, 0);
};

const checkDiagonal = (y: number, x: number) => {
  return checkLine(y, x, 1, 1) || checkLine(y, x, 1, -1);
};

const checkLine = (y: number, x: number, dy: number, dx: number) => {
  const turn = board[y][x];
  let cnt = 1;
  let i = 1;
  while (
    y + dy * i < n &&
    x + dx * i < n &&
    board[y + dy * i][x + dx * i] === turn
  ) {
    i++;
    cnt++;
  }
  i = 1;
  while (
    y - dy * i >= 0 &&
    x - dx * i >= 0 &&
    board[y - dy * i][x - dx * i] === turn
  ) {
    i++;
    cnt++;
  }
  return cnt === 5;
};

let n: number;
let i = 0;
let board: number[][];
let ret = -1;

createInterface({
  input: process.stdin,
  output: process.stdout,
})
  .on("line", handleInput)
  .on("close", () => {
    console.log(ret.toString());
    process.exit();
  });
