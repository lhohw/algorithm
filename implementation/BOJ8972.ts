// 8972: 미친 아두이노
import { createInterface } from "readline";

type Arduino = {
  y: number;
  x: number;
};
const handleInput = (input: string) => {
  if (n === undefined || m === undefined) {
    setNM(input);
  } else if (board.length !== n) {
    addRow(input);
  } else {
    setDirs(input);
  }
};

const setNM = (input: string) => {
  [n, m] = input.split(" ").map(Number);
};
const addRow = (input: string) => {
  const y = board.length;
  const row: number[] = [];
  for (let x = 0; x < input.length; x++) {
    if (input[x] === ".") row.push(0);
    else {
      const arduino = { y, x };
      if (input[x] === "I") me = arduino;
      else arduinos.push(arduino);
      row.push(1);
    }
  }
  board.push(row);
};
const setDirs = (input: string) => (dirs = input);

const solve = () => {
  for (let i = 0; i < dirs.length; i++) {
    const dir = +dirs[i] - 1;
    if (!play(dir)) {
      console.log(`kraj ${i + 1}`);
      return;
    }
  }
  printBoard();
};

const play = (dir: number) => {
  move(me, dir);
  if (board[me.y][me.x] > 1) return false;
  moveArduinos();
  if (board[me.y][me.x] > 1) return false;
  cleanUp();

  return true;
};

const move = (arduino: Arduino, d: number) => {
  const { y, x } = arduino;
  const ny = y + dy[d];
  const nx = x + dx[d];
  board[y][x]--;
  board[ny][nx]++;
  arduino.y = ny;
  arduino.x = nx;
};

const moveArduinos = () => {
  for (const arduino of arduinos) {
    const d = findDirection(arduino);
    move(arduino, d);
  }
};

const findDirection = (arduino: Arduino) => {
  const { y, x } = arduino;
  let min = Infinity;
  let dir = -1;
  for (let d = 0; d < 9; d++) {
    const ny = y + dy[d];
    const nx = x + dx[d];
    if (isOut(ny, nx)) continue;
    const cand = Math.abs(me.y - ny) + Math.abs(me.x - nx);
    if (cand < min) {
      min = cand;
      dir = d;
    }
  }
  return dir;
};

const isOut = (y: number, x: number) => y < 0 || y >= n || x < 0 || x >= m;

const cleanUp = () => {
  const nextArduinos: Arduino[] = [];
  const { y: my, x: mx } = me;
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < m; x++) {
      if (y === my && x === mx) continue;
      if (board[y][x] >= 2) board[y][x] = 0;
      if (board[y][x]) nextArduinos.push({ y, x });
    }
  }
  arduinos = nextArduinos;
};

const printBoard = () => {
  const ret: string[][] = board.map((row) => row.map((e) => (e ? "R" : ".")));
  ret[me.y][me.x] = "I";
  console.log(ret.map((row) => row.join("")).join("\n"));
};

let n: number, m: number;
const board: number[][] = [];
let dirs: string;
const dy = [1, 1, 1, 0, 0, 0, -1, -1, -1];
const dx = [-1, 0, 1, -1, 0, 1, -1, 0, 1];
let arduinos: Arduino[] = [];
let me: Arduino;
createInterface({
  input: process.stdin,
  output: process.stdout,
})
  .on("line", handleInput)
  .on("close", () => {
    solve();
    process.exit();
  });
