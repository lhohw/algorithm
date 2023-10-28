// 16956: 늑대와 양
import { readFileSync } from "fs";

type _Node = {
  y: number;
  x: number;
  key: 0 | 1;
  next?: _Node;
};
class Queue {
  private head: _Node = null!;
  private tail: _Node = null!;
  private size = 0;
  push(node: _Node) {
    if (this.size === 0) this.head = node;
    else this.tail.next = node;
    this.tail = node;
    this.size++;
  }
  shift() {
    const ret = this.head;
    this.size--;
    if (this.size === 0) {
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
}
const [, ...board] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(""));
const n = board.length;
const m = board[0].length;
const dy = [-1, 0, 1, 0];
const dx = [0, 1, 0, -1];

const print = () => console.log(solve());

const solve = () => {
  const data = init();
  if (data === null) return "0";

  const { sheeps, wolves } = data;
  buildFence(sheeps, wolves);
  return `1\n${serialize(board)}`;
};

const init = () => {
  const sheeps: number[][] = [];
  const wolves: number[][] = [];
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < m; x++) {
      if (isBlank(y, x)) continue;
      for (let d = 1; d <= 2; d++) {
        const ny = y + dy[d];
        const nx = x + dx[d];
        if (isOut(ny, nx)) continue;
        if (isStickTogether(y, x, ny, nx)) return null;
      }
      if (isSheep(y, x)) sheeps.push([y, x]);
      else wolves.push([y, x]);
    }
  }
  return { sheeps, wolves };
};

const isOut = (y: number, x: number) => y < 0 || y >= n || x < 0 || x >= m;

const isStickTogether = (y: number, x: number, ny: number, nx: number) => {
  if (isSheep(y, x)) return isWolf(ny, nx);
  if (isWolf(y, x)) return isSheep(ny, nx);
  return false;
};

const isBlank = (y: number, x: number) => board[y][x] === ".";
const isSheep = (y: number, x: number) => board[y][x] === "S";
const isWolf = (y: number, x: number) => board[y][x] === "W";

const buildFence = (sheeps: number[][], wolves: number[][]) => {
  const { visited, queue } = initQueue(sheeps, wolves);
  while (queue.length()) {
    const { y, x, key } = queue.shift();
    for (let d = 0; d < 4; d++) {
      const ny = y + dy[d];
      const nx = x + dx[d];
      if (isOut(ny, nx)) continue;
      if (visited[ny][nx] === undefined) {
        visited[ny][nx] = key;
        queue.push({ y: ny, x: nx, key });
        continue;
      }
      if ((key ^ visited[ny][nx]) === 1) {
        board[ny][nx] = "D";
      }
    }
  }
};

const initQueue = (sheeps: number[][], wolves: number[][]) => {
  const visited: number[][] = Array.from({ length: n }).map(() =>
    new Array(m).fill(undefined)
  );
  const queue = new Queue();

  for (const [y, x] of sheeps) {
    const node: _Node = { y, x, key: 0 };
    queue.push(node);
    visited[y][x] = 2;
  }

  for (const [y, x] of wolves) {
    const node: _Node = { y, x, key: 1 };
    queue.push(node);
    visited[y][x] = 2;
  }
  return { visited, queue };
};

const serialize = (board: string[][]) =>
  board.map((row) => row.join("")).join("\n");

print();
