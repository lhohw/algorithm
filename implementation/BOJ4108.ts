// 4108: 지뢰찾기
import { createInterface } from "readline";

const handleInput = (input: string) => {
  if (n === undefined || m === undefined) {
    init(input);
  } else {
    addRow(input);
    if (board.length === n) {
      ret += solve() + "\n";
      cleanUp();
    }
  }
};

const init = (input: string) => {
  [n, m] = input.split(" ").map(Number);
  board = [];
  count = new Array(n).fill(undefined).map(() => new Array(m).fill(0));
};

const addRow = (input: string) => {
  board.push(input);
};

const solve = () => {
  investigate();
  return getCount();
};

const investigate = () => {
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < m; x++) {
      if (board[y][x] === ".") continue;
      count[y][x] = -Infinity;
      for (let d = 0; d < 8; d++) {
        const ny = y + dy[d];
        const nx = x + dx[d];
        if (isOut(ny, nx)) continue;
        count[ny][nx]++;
      }
    }
  }
};

const isOut = (y: number, x: number) => y < 0 || y >= n || x < 0 || x >= m;

const getCount = () => {
  return count
    .map((row) => row.map((e) => (e === -Infinity ? "*" : e)).join(""))
    .join("\n");
};

const cleanUp = () => {
  [n, m, board, count] = new Array(4).fill(undefined);
};

const print = () => console.log(ret.trimEnd());

let n: number, m: number;
let board: string[];
let count: number[][];
const dy = [-1, -1, 0, 1, 1, 1, 0, -1];
const dx = [0, 1, 1, 1, 0, -1, -1, -1];
let ret = "";
createInterface({
  input: process.stdin,
  output: process.stdout,
})
  .on("line", handleInput)
  .on("close", () => {
    print();
    process.exit();
  });
