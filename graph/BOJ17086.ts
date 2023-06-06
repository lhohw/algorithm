// 17086: 아기 상어 2
import { readFileSync } from "fs";

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
const [[n, m], ...board] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));
const dy = [-1, -1, -1, 0, 1, 1, 1, 0];
const dx = [-1, 0, 1, 1, 1, 0, -1, -1];

const print = () => console.log(solve().toString());

const solve = () => {
  const queue = init();
  let ret = 0;
  while (queue.length()) {
    const { y, x } = queue.shift();
    const distance = board[y][x];
    for (let d = 0; d < 8; d++) {
      const ny = y + dy[d];
      const nx = x + dx[d];
      if (isOut(ny, nx) || board[ny][nx]) continue;
      board[ny][nx] = distance + 1;
      queue.push({ y: ny, x: nx });
      ret = Math.max(ret, board[ny][nx]);
    }
  }
  return ret - 1;
};

const init = () => {
  const queue = new Queue();
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < m; x++) {
      if (board[y][x] === 1) {
        queue.push({ y, x });
      }
    }
  }
  return queue;
};

const isOut = (y: number, x: number) => y < 0 || y >= n || x < 0 || x >= m;

print();
