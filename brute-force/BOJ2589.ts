// 2589: 보물섬
import { readFileSync } from "fs";

type _Node = {
  y: number;
  x: number;
  dist: number;
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

const solve = () => {
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < m; x++) {
      if (board[y][x] === "W") continue;
      const cand = traverse(y, x);
      if (ret < cand) ret = cand;
    }
  }
};

const traverse = (y: number, x: number) => {
  const visited = new Array(n)
    .fill(undefined)
    .map(() => new Array(m).fill(false));
  visited[y][x] = true;
  const queue = new Queue();
  queue.push({ y, x, dist: 0 });

  let ret = 0;
  while (queue.length()) {
    const { y, x, dist } = queue.shift();
    ret = Math.max(ret, dist);
    for (let d = 0; d < 4; d++) {
      const ny = y + dy[d];
      const nx = x + dx[d];
      if (isOut(ny, nx) || board[ny][nx] === "W" || visited[ny][nx]) continue;
      visited[ny][nx] = true;
      queue.push({ y: ny, x: nx, dist: dist + 1 });
    }
  }
  return ret;
};

const isOut = (y: number, x: number) => y < 0 || y >= n || x < 0 || x >= m;

const print = () => console.log(ret.toString());

const board = readFileSync("/dev/stdin").toString().trim().split("\n");
const [n, m] = board.shift()!.split(" ").map(Number);
const dy = [-1, 0, 1, 0];
const dx = [0, 1, 0, -1];
let ret = 0;

solve();
print();
