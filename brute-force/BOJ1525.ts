// 1525: 퍼즐
import { readFileSync } from "fs";

type _Node = {
  key: number;
  y: number;
  x: number;
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
const board = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));
const TARGET = 87654321;
const n = 3;
const dy = [-1, 0, 1, 0];
const dx = [0, 1, 0, -1];

const print = () => console.log(solve().toString());

const solve = () => {
  const { cache, queue } = init();
  return arrange(cache, queue);
};

const init = () => {
  const [y, x] = getBlank();
  const key = getKey();
  const cache = new Set<number>();
  cache.add(key);
  const queue = new Queue();
  queue.push({ y, x, count: 0, key });

  return { cache, queue };
};

const getBlank = () => {
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      if (board[y][x] === 0) return [y, x];
    }
  }
  throw new Error("invalid");
};

const getKey = () => {
  let key = "";
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      key = board[y][x] + key;
    }
  }
  return parseInt(key);
};

const arrange = (cache: Set<number>, queue: Queue) => {
  while (queue.length()) {
    const { y, x, count, key } = queue.shift();
    if (key === TARGET) return count;
    for (let d = 0; d < 4; d++) {
      const ny = y + dy[d];
      const nx = x + dx[d];
      const nextKey = swap(key, y, x, ny, nx);
      if (isOut(ny, nx) || cache.has(nextKey)) continue;
      cache.add(nextKey);
      queue.push({ y: ny, x: nx, count: count + 1, key: nextKey });
    }
  }
  return -1;
};

const isOut = (y: number, x: number) => y < 0 || y >= n || x < 0 || x >= n;

const swap = (key: number, y1: number, x1: number, y2: number, x2: number) => {
  const idx1 = getIdx(y1, x1);
  const idx2 = getIdx(y2, x2);
  const digit1 = getDigit(key, idx1);
  const digit2 = getDigit(key, idx2);
  key -= digit1 * 10 ** idx1;
  key -= digit2 * 10 ** idx2;
  key += digit1 * 10 ** idx2;
  key += digit2 * 10 ** idx1;
  return key;
};

const getIdx = (y: number, x: number) => n * y + x;

const getDigit = (key: number, idx: number) => {
  const zeros = 10 ** idx;
  return Math.floor((key % (zeros * 10)) / zeros);
};

print();
