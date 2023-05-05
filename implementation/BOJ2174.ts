// 2174: 로봇 시뮬레이션
import { createInterface } from "readline";

class Robot {
  constructor(
    private key: number,
    private x: number,
    private y: number,
    private d: number
  ) {}
  L() {
    const { d } = this;
    this.d = (d + 1) % 4;
  }
  R() {
    const { d } = this;
    this.d = (d - 1 + 4) % 4;
  }
  F() {
    const { key, y, x, d } = this;
    const ny = y + dy[d];
    const nx = x + dx[d];
    if (isOut(ny, nx)) {
      return `Robot ${key} crashes into the wall`;
    }
    if (board[ny][nx] !== 0) {
      return `Robot ${key} crashes into robot ${board[ny][nx]}`;
    }
    board[y][x] = 0;
    board[ny][nx] = key;
    this.x = nx;
    this.y = ny;
    return "";
  }
  command(cmd: "L" | "R" | "F") {
    return this[cmd]();
  }
}

const handleInput = (input: string) => {
  if (row === undefined || col === undefined) {
    setBoard(input);
  } else if (n === undefined || m === undefined) {
    setCount(input);
  } else if (robots.length !== n) {
    addRobot(input);
  } else {
    command(input);
  }
};

const isOut = (y: number, x: number) => y < 0 || y >= row || x < 0 || x >= col;

const setBoard = (input: string) => {
  [col, row] = input.split(" ").map(Number);
  board = new Array(row).fill(undefined).map(() => new Array(col).fill(0));
};

const setCount = (input: string) => {
  [n, m] = input.split(" ").map(Number);
};

const addRobot = (input: string) => {
  const [_x, _y, dir] = input.split(" ");
  const x = +_x - 1;
  const y = +_y - 1;
  const key = robots.length + 1;
  const robot = new Robot(key, x, y, dirMap[dir as keyof typeof dirMap]);
  board[y][x] = key;
  robots.push(robot);
};

const command = (input: string) => {
  if (ret) return;
  const [target, cmd, i] = input.split(" ");
  const robot = robots[+target - 1];
  const iter = cmd === "F" ? +i : +i % 4;
  for (let i = 0; i < iter; i++) {
    const message = robot.command(cmd as "L" | "R" | "F");
    if (message) {
      ret += `${message}\n`;
      break;
    }
  }
};

const print = () => console.log(ret ? ret.trimEnd() : "OK");

let row: number, col: number;
let n: number, m: number;
const robots: Robot[] = [];
let board: number[][];
const dy = [-1, 0, 1, 0];
const dx = [0, 1, 0, -1];
const dirMap = {
  S: 0,
  E: 1,
  N: 2,
  W: 3,
};
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
