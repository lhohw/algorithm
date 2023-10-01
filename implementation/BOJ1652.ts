// 1652: 누울 자리를 찾아라
import { readFileSync } from "fs";

const [, ...board] = readFileSync("/dev/stdin").toString().trim().split("\n");
const n = board.length;

const print = () => console.log(solve());

const solve = () => {
  return horizontalCount() + " " + verticalCount();
};

const horizontalCount = () => {
  let ret = 0;
  for (const row of board) {
    ret += count(row);
  }
  return ret;
};

const verticalCount = () => {
  let ret = 0;
  let row = "";
  for (let x = 0; x < n; x++) {
    for (let y = 0; y < n; y++) {
      row += board[y][x];
    }
    ret += count(row);
    row = "";
  }
  return ret;
};

const count = (row: string) => {
  return row.split(/[X]+/g).filter((e) => e.length >= 2).length;
};

print();
