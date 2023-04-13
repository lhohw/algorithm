// 9291: 스도쿠 채점
import { createInterface } from "readline";

const handleInput = (input: string) => {
  if (t === undefined) setT(input);
  else if (!input.trim()) cleanUp();
  else {
    addRow(input);
    if (board.length === len) mark();
  }
};

const setT = (input: string) => (t = +input);

const mark = () => {
  const flag = checkVertical() && checkHorizontal() && checkArea();
  ret += `Case ${++i}: ${flag ? "" : "IN"}CORRECT\n`;
};

const checkVertical = () => {
  for (let x = 0; x < len; x++) {
    const counts = new Array(10).fill(0);
    counts[0] = 1;
    for (let y = 0; y < len; y++) {
      const number = board[y][x];
      if (++counts[number] > 1) return false;
    }
    if (counts.some((cnt) => cnt !== 1)) return false;
  }
  return true;
};

const checkHorizontal = () => {
  for (let y = 0; y < len; y++) {
    const counts = new Array(10).fill(0);
    counts[0] = 1;
    for (let x = 0; x < len; x++) {
      const number = board[y][x];
      if (++counts[number] > 1) return false;
    }
    if (counts.some((cnt) => cnt !== 1)) return false;
  }
  return true;
};

const checkArea = () => {
  for (let sy = 0; sy < len; sy += len / 3) {
    for (let sx = 0; sx < len; sx += len / 3) {
      const counts = new Array(10).fill(0);
      counts[0] = 1;
      for (let i = 0; i < len / 3; i++) {
        const y = sy + i;
        for (let j = 0; j < len / 3; j++) {
          const x = sx + j;
          const number = board[y][x];
          if (++counts[number] > 1) return false;
        }
      }
      if (counts.some((cnt) => cnt !== 1)) return false;
    }
  }
  return true;
};

const cleanUp = () => {
  board = [];
};

const addRow = (input: string) => {
  board.push(input.split(" ").map(Number));
};

let t: number;
let board: number[][] = [];
let ret = "";
let i = 0;
const len = 9;
createInterface({
  input: process.stdin,
  output: process.stdout,
})
  .on("line", handleInput)
  .on("close", () => {
    console.log(ret.trimEnd());
    process.exit();
  });
