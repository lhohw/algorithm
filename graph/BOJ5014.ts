// 5014: 스타트링크
import { readFileSync } from "fs";

type _Node = {
  key: number;
  next?: _Node;
};
class Queue {
  private head: _Node = null!;
  private tail: _Node = null!;
  private size = 0;
  private isInQueue = new Array(1e6 + 1).fill(false);
  push(key: number) {
    const node = { key };
    if (this.isInQueue[key]) return;
    this.isInQueue[key] = true;
    if (this.size === 0) this.head = node;
    else this.tail.next = node;
    this.tail = node;
    this.size++;
  }
  shift() {
    const { key } = this.head;
    this.size--;
    if (this.size === 0) {
      this.head = null!;
      this.tail = null!;
    } else {
      this.head = this.head.next!;
    }
    this.isInQueue[key] = false;
    return key;
  }
  length() {
    return this.size;
  }
}
const [f, s, g, u, d] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(" ")
  .map(Number);

const print = () => console.log(solve());

const solve = () => {
  const ret = count();
  if (ret === Infinity) return "use the stairs";
  return ret.toString();
};

const count = () => {
  if (d === 0) {
    const gap = g - s;
    if (gap < 0 || gap % u !== 0) return Infinity;
    return gap / u;
  }
  if (u === 0) {
    const gap = g - s;
    if (gap > 0 || gap % d !== 0) return Infinity;
    return -gap / d;
  }
  const dist: number[] = new Array(1e6 + 1).fill(Infinity);
  dist[s] = 0;
  const queue = new Queue();
  queue.push(s);
  while (queue.length() && dist[g] === Infinity) {
    const key = queue.shift();

    const up = key + u;
    const down = key - d;
    if (!isOut(up) && dist[up] > dist[key] + 1) {
      dist[up] = dist[key] + 1;
      queue.push(up);
    }
    if (!isOut(down) && dist[down] > dist[key] + 1) {
      dist[down] = dist[key] + 1;
      queue.push(down);
    }
  }

  return dist[g];
};

const isOut = (key: number) => key < 1 || key > f;

print();
