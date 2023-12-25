// 7562: 나이트의 이동
import { createInterface } from "readline";

class Pos {
  constructor(public y: number, public x: number) {}
  static init(str: string) {
    const [y, x] = str.split(" ").map(Number);
    return new Pos(y, x);
  }
  isEqual(pos: Pos) {
    const { y, x } = this;
    return y === pos.y && x === pos.x;
  }
}
type _Node = {
  pos: Pos;
  next?: _Node;
};
class Queue {
  private head: _Node = null!;
  private tail: _Node = null!;
  private size = 0;
  push(pos: Pos) {
    const node = { pos };
    if (this.size === 0) this.head = node;
    else this.tail.next = node;
    this.tail = node;
    this.size++;
  }
  shift() {
    const { pos } = this.head;
    this.size--;
    if (this.size === 0) {
      this.head = null!;
      this.tail = null!;
    } else {
      this.head = this.head.next!;
    }
    return pos;
  }
  length() {
    return this.size;
  }
}
let t: number;
let n: number;
let board: number[][];
let start: Pos;
let target: Pos;
let ret = "";
const dy = [-2, -1, 1, 2, 2, 1, -1, -2];
const dx = [1, 2, 2, 1, -1, -2, -2, -1];

const handleInput = (input: string) => {
  if (t === undefined) setT(input);
  else if (n === undefined) init(input);
  else if (start === undefined) setStart(input);
  else {
    setTarget(input);
    ret += bfs() + "\n";
    cleanUp();
  }
};

const setT = (input: string) => (t = +input);
const init = (input: string) => {
  n = +input;
  board = Array.from({ length: n }).map(() => Array(n).fill(0));
};
const setStart = (input: string) => (start = Pos.init(input));
const setTarget = (input: string) => (target = Pos.init(input));

const bfs = () => {
  if (isTarget(start)) return 0;

  const queue = new Queue();
  queue.push(start);
  while (queue.length()) {
    const pos = queue.shift();
    const { y, x } = pos;
    for (let d = 0; d < 8; d++) {
      const ny = y + dy[d];
      const nx = x + dx[d];
      if (isOut(ny, nx) || isVisited(ny, nx)) continue;

      const nextPos = new Pos(ny, nx);
      const nextCount = board[y][x] + 1;
      if (isTarget(nextPos)) return nextCount;
      board[ny][nx] = nextCount;
      queue.push(nextPos);
    }
  }
};

const isTarget = (pos: Pos) => pos.isEqual(target);
const isOut = (y: number, x: number) => y < 0 || y >= n || x < 0 || x >= n;
const isVisited = (y: number, x: number) => board[y][x] !== 0;
const cleanUp = () => {
  [n, board, start, target] = Array(4).fill(undefined);
};

const solve = () => {
  createInterface({
    input: process.stdin,
    output: process.stdout,
  })
    .on("line", handleInput)
    .on("close", () => {
      print();
      process.exit();
    });
};

const print = () => console.log(ret.trimEnd());

solve();
