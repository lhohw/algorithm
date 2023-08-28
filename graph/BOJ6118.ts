// 6118: 숨바꼭질
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
const [[n, m], ...edges] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));
const adj: number[][] = Array.from({ length: n }).map(() => []);

const print = () => console.log(solve());

const solve = () => {
  init();
  const dist = traverse(0);
  const max = Math.max(...dist);
  let number = -1;
  let count = 0;
  for (let i = 0; i < n; i++) {
    if (dist[i] === max) {
      if (number === -1) number = i + 1;
      count++;
    }
  }
  return `${number} ${max} ${count}`;
};

const init = () => {
  for (let i = 0; i < m; i++) {
    let [u, v] = edges[i];
    u--;
    v--;
    adj[u].push(v);
    adj[v].push(u);
  }
};

const traverse = (start: number) => {
  const dist = new Array(n).fill(Infinity);
  dist[start] = 0;
  const queue = new Queue();
  queue.push(start);
  const visited = new Array(n).fill(false);
  visited[start] = true;
  while (queue.length()) {
    const here = queue.shift();
    for (const there of adj[here]) {
      if (visited[there]) continue;
      visited[there] = true;
      dist[there] = dist[here] + 1;
      queue.push(there);
    }
  }
  return dist;
};

print();
