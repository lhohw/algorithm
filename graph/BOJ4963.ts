// 4963: 섬의 개수
import { createInterface } from "readline";

type _Node = {
  y: number;
  x: number;
  next?: _Node;
};
class Queue {
  private head: _Node = null!;
  private tail: _Node = null!;
  private size = 0;
  push(node: _Node) {
    if (this.isEmpty()) this.head = node;
    else this.tail.next = node;
    this.tail = node;
    this.size++;
  }
  shift() {
    const ret = this.head;
    this.size--;
    if (this.isEmpty()) {
      this.head = null!;
      this.tail = null!;
    } else {
      this.head = this.head.next!;
    }
    return ret;
  }
  length() {
    return this.size;
  }
  private isEmpty() {
    return this.size === 0;
  }
}

let w: number, h: number;
let board: string[][];
let ret = "";
const dy = [-1, -1, -1, 0, 1, 1, 1, 0];
const dx = [-1, 0, 1, 1, 1, 0, -1, -1];
const handleInput = (input: string) => {
  if (w === undefined || h === undefined || board === undefined) {
    init(input);
  } else if (board.length !== h) {
    addRow(input);
    if (board.length === h) {
      ret += countIslands() + "\n";
      cleanUp();
    }
  }
};

const init = (input: string) => {
  [w, h] = input.split(" ").map(Number);
  board = [];
};

const addRow = (input: string) => {
  board.push(input.split(" "));
};

const countIslands = () => {
  let islands = 0;
  const queue = new Queue();
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (board[y][x] === "0") continue;
      islands++;
      queue.push({ y, x });
      board[y][x] = "0";
      while (queue.length()) {
        const { y, x } = queue.shift();
        for (let d = 0; d < 8; d++) {
          const ny = y + dy[d];
          const nx = x + dx[d];
          if (isOut(ny, nx) || board[ny][nx] === "0") continue;
          board[ny][nx] = "0";
          queue.push({ y: ny, x: nx });
        }
      }
    }
  }
  return islands;
};

const isOut = (y: number, x: number) => y < 0 || y >= h || x < 0 || x >= w;

const cleanUp = () => {
  [w, h, board] = new Array(3).fill(undefined);
};

const print = () => console.log(ret.trimEnd());

createInterface({
  input: process.stdin,
  output: process.stdout,
})
  .on("line", handleInput)
  .on("close", () => {
    print();
    process.exit();
  });
