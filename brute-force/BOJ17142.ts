// 17142: 연구소 3
import { readFileSync } from "fs";

type _Node = {
  y: number;
  x: number;
  next?: _Node;
};
class Queue {
  head: _Node = null!;
  tail: _Node = null!;
  size = 0;
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
    } else this.head = this.head.next!;
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
const dy = [-1, 0, 1, 0];
const dx = [0, 1, 0, -1];
const virus: _Node[] = [];
for (let y = 0; y < n; y++) {
  for (let x = 0; x < n; x++) {
    if (board[y][x] === 2) virus.push({ y, x });
  }
}

let ret = Infinity;
const spread = (pos: _Node[]) => {
  let innerQueue = new Queue(),
    outerQueue = new Queue();
  const visited = new Array(n)
    .fill(undefined)
    .map(() => new Array(n).fill(undefined));
  for (const node of pos) {
    outerQueue.push(node);
    visited[node.y][node.x] = 0;
  }

  let iter = 0;
  while (outerQueue.length()) {
    let flag = true;
    for (let y = 0; y < n; y++) {
      for (let x = 0; x < n; x++) {
        if (board[y][x] === 0 && visited[y][x] === undefined) {
          flag = false;
          break;
        }
      }
      if (!flag) break;
    }
    if (flag) return iter;

    iter++;
    if (iter >= ret) return Infinity;
    innerQueue = outerQueue;
    outerQueue = new Queue();
    while (innerQueue.length()) {
      const { y, x } = innerQueue.shift();
      for (let d = 0; d < 4; d++) {
        const ny = y + dy[d];
        const nx = x + dx[d];
        if (
          ny < 0 ||
          nx < 0 ||
          ny >= n ||
          nx >= n ||
          visited[ny][nx] !== undefined ||
          board[ny][nx] === 1
        )
          continue;
        visited[ny][nx] = iter;
        outerQueue.push({ y: ny, x: nx });
      }
    }
  }
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      if (visited[y][x] === undefined && board[y][x] !== 1) return Infinity;
    }
  }
  return iter;
};

const makePos = (pos: _Node[], start: number) => {
  if (pos.length === m) {
    ret = Math.min(ret, spread(pos));
    return;
  }
  for (let i = start; i < virus.length; i++) {
    pos.push(virus[i]);
    makePos(pos, i + 1);
    pos.pop();
  }
};
const solve = () => {
  makePos([], 0);
  if (ret === Infinity) return -1;
  return ret;
};

console.log(solve().toString());
