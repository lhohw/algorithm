// 12886: 돌 그룹
import { readFileSync } from "fs";

const stones = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(" ")
  .map(Number);

type _Node = {
  stones: number[];
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
const visited = new Array(1501)
  .fill(undefined)
  .map(() => new Array(1501).fill(false));
const play = (stones: number[]) => {
  const sum = stones.reduce((x, y) => x + y);
  if (sum % 3 !== 0) return false;

  const queue = new Queue();
  queue.push({ stones });
  visited[stones[0]][stones[1]] = true;
  while (queue.length()) {
    const { stones } = queue.shift();
    const [A, B, C] = stones;
    if (A === B && B === C) return true;
    const next: number[][] = [];
    if (A !== B) next.push([A + A, B - A, C].sort((a, b) => a - b));
    if (B !== C) next.push([A, B + B, C - B].sort((a, b) => a - b));
    if (A !== C) next.push([A + A, B, C - A].sort((a, b) => a - b));
    for (const [nextA, nextB, nextC] of next) {
      if (visited[nextA][nextB]) continue;
      visited[nextA][nextB] = true;
      queue.push({ stones: [nextA, nextB, nextC] });
    }
  }
  return false;
};

console.log(Number(play(stones.sort((a, b) => a - b))).toString());
