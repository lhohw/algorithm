// 1261: 알고스팟
import { readFileSync } from "fs";

type _Node = {
  y: number;
  x: number;
  count: number;
  next?: _Node;
};
class Deque {
  private head: _Node = null!;
  private tail: _Node = null!;
  private size = 0;

  push(node: _Node) {
    if (this.size === 0) this.head = node;
    else this.tail.next = node;
    this.tail = node;
    this.size++;
  }
  unshift(node: _Node) {
    if (this.size === 0) this.tail = node;
    else node.next = this.head;
    this.head = node;
    this.size++;
  }
  shift() {
    this.size--;
    const ret = this.head;
    if (this.size === 0) {
      this.head = null!;
      this.tail = null!;
    } else this.head = this.head.next!;
    return ret;
  }
  length() {
    return this.size;
  }
}
const [[m, n], ...board] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row, i) => (i === 0 ? row.split(" ").map(Number) : row)) as [
  number[],
  ...string[]
];
const dy = [-1, 0, 1, 0];
const dx = [0, 1, 0, -1];

const solve = () => {
  if (n === 1 && m === 1) return 0;
  const deque = new Deque();
  deque.push({ y: 0, x: 0, count: 0 });
  const visited = new Array(n)
    .fill(undefined)
    .map(() => new Array(m).fill(false));
  visited[0][0] = true;

  while (deque.length()) {
    const { y, x, count } = deque.shift();
    for (let d = 0; d < 4; d++) {
      const ny = y + dy[d];
      const nx = x + dx[d];
      if (isOut(ny, nx) || visited[ny][nx]) continue;
      const isWall = board[ny][nx] === "1";
      visited[ny][nx] = true;
      if (ny === n - 1 && nx === m - 1) return count;
      if (isWall) deque.push({ y: ny, x: nx, count: count + 1 });
      else deque.unshift({ y: ny, x: nx, count });
    }
  }
  throw new Error("Invalid");
};

const isOut = (y: number, x: number) => y < 0 || y >= n || x < 0 || x >= m;

const print = () => console.log(solve().toString());

print();
