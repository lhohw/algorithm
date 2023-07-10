// 20304: 비밀번호 제작
import { readFileSync } from "fs";

type _Node = {
  key: number;
  next?: _Node;
};
class Queue {
  private head: _Node = null!;
  private tail: _Node = null!;
  private size = 0;
  push(key: number) {
    const node = { key };
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
    return key;
  }
  length() {
    return this.size;
  }
}
const [[n], [m], p] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));
const MAX = Math.floor(Math.log2(n)) + 1;

const print = () => console.log(solve().toString());

const solve = () => {
  const { cache, queue } = init();
  while (queue.length()) {
    const mask = queue.shift();
    for (let i = 0; i < MAX; i++) {
      const target = mask ^ (1 << i);
      if (cache[target] !== -1) continue;
      cache[target] = cache[mask] + 1;
      queue.push(target);
    }
  }
  return Math.max(...cache);
};

const init = () => {
  const queue = new Queue();
  const cache = new Array(n + 1).fill(-1);
  for (let i = 0; i < m; i++) {
    const usedPassword = p[i];
    cache[usedPassword] = 0;
    queue.push(usedPassword);
  }
  return { queue, cache };
};

print();
