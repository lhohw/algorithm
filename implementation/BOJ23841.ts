// 23841: 데칼코마니
import { readFileSync } from "fs";

const [[n, m], ...board] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row, i) => (i === 0 ? row.split(" ").map(Number) : row.split(""))) as [
  number[],
  ...string[][]
];
for (let y = 0; y < n; y++) {
  let right = m / 2;
  let left = right - 1;
  while (left >= 0) {
    if (board[y][left] !== ".") board[y][right] = board[y][left];
    else if (board[y][right] !== ".") board[y][left] = board[y][right];
    left--;
    right++;
  }
}

console.log(board.map((row) => row.join("")).join("\n"));
