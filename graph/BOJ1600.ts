// 1600: 말이 되고픈 원숭이
import { readFileSync } from "fs";

type _Node = {
  y: number;
  x: number;
  k: number;
  count: number;
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
const [[k], [w, h], ...board] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

const cache = Array.from({ length: h }, () =>
  Array.from({ length: w }, () => Array.from({ length: k + 1 }).fill(-1))
) as number[][][];

const MAX = 1 << 30;
const dy = [-1, 0, 1, 0];
const dx = [0, 1, 0, -1];

const hdy = [-2, -1, 1, 2, 2, 1, -1, -2];
const hdx = [1, 2, 2, 1, -1, -2, -2, -1];

const print = () => console.log(solve().toString());

const solve = () => {
  if (h === 1 && w === 1) return 0;

  const queue = new Queue();
  queue.push({ y: 0, x: 0, count: 0, k });
  cache[0][0][k] = 0;
  while (queue.length()) {
    const { y, x, count, k } = queue.shift();
    const nextCount = count + 1;
    let nextK = k;
    let minCount = move(y, x, nextK, nextCount, queue, dy, dx);
    if (minCount !== MAX) return minCount;

    if (nextK) {
      nextK--;
      minCount = move(y, x, nextK, nextCount, queue, hdy, hdx);
      if (minCount !== MAX) return minCount;
    }
  }
  return -1;
};

const move = (
  y: number,
  x: number,
  nextK: number,
  nextCount: number,
  queue: Queue,
  dy: number[],
  dx: number[]
) => {
  for (let d = 0; d < dy.length; d++) {
    const ny = y + dy[d];
    const nx = x + dx[d];
    if (isOut(ny, nx) || isWall(ny, nx) || cache[ny][nx][nextK] !== -1)
      continue;
    if (isGoal(ny, nx)) return nextCount;
    cache[ny][nx][nextK] = nextCount;
    queue.push({ y: ny, x: nx, count: nextCount, k: nextK });
  }
  return MAX;
};

const isOut = (y: number, x: number) => y < 0 || y >= h || x < 0 || x >= w;

const isWall = (y: number, x: number) => board[y][x] === 1;

const isGoal = (y: number, x: number) => y === h - 1 && x === w - 1;

print();
