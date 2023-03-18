// 13161: 분단의 슬픔
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
    } else this.head = this.head.next!;
    return key;
  }
  length() {
    return this.size;
  }
}
const [[n], preference, ...degree] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

let capacity: number[][], flow: number[][], source: number, sink: number;
let len: number;
let adj: number[][];
let level: number[];
let start: number[];

const solve = () => {
  init();
  return dinic();
};

const init = () => {
  len = n + 2;
  source = 0;
  sink = len - 1;
  adj = new Array(len).fill(undefined).map(() => []);

  capacity = new Array(len).fill(undefined).map(() => new Array(len).fill(0));
  flow = new Array(len).fill(undefined).map(() => new Array(len).fill(0));

  for (let i = 0; i < n; i++) {
    const prefer = preference[i];
    if (prefer === 1) {
      link(source, i + 1, Infinity);
    } else if (prefer === 2) {
      link(i + 1, sink, Infinity);
    }
  }
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      link(i + 1, j + 1, degree[i][j]);
      capacity[j + 1][i + 1] = degree[i][j];
    }
  }
};

const link = (here: number, there: number, value: number) => {
  adj[here].push(there);
  adj[there].push(here);
  capacity[here][there] = value;
};

const dinic = () => {
  let totalFlow = 0;
  while (bfs()) {
    start = new Array(len).fill(0);
    while (true) {
      const amount = dfs(source, Infinity);
      if (amount === 0) break;
      totalFlow += amount;
    }
  }
  return totalFlow;
};

const bfs = () => {
  level = new Array(len).fill(-1);
  level[source] = 0;
  const queue = new Queue();
  queue.push(source);
  while (queue.length()) {
    const here = queue.shift();
    for (const there of adj[here]) {
      if (level[there] === -1 && residualCapacity(here, there) > 0) {
        level[there] = level[here] + 1;
        queue.push(there);
      }
    }
  }
  return level[sink] !== -1;
};

const dfs = (here: number, amount: number): number => {
  if (here === sink) return amount;
  for (let i = start[here]; i < adj[here].length; i++) {
    const there = adj[here][i];
    if (level[there] === level[here] + 1 && residualCapacity(here, there) > 0) {
      const ret = dfs(there, Math.min(residualCapacity(here, there), amount));
      if (ret > 0) {
        flow[here][there] += ret;
        flow[there][here] -= ret;

        start[here] = i;
        return ret;
      }
    }
  }
  start[here] = adj[here].length;
  return 0;
};

const residualCapacity = (here: number, there: number) =>
  capacity[here][there] - flow[here][there];

const print = () => {
  const totalFlow = solve().toString();
  const A: number[] = [];
  const B: number[] = [];
  for (let i = 1; i < len - 1; i++) {
    if (level[i] !== -1) A.push(i);
    else B.push(i);
  }
  console.log(`${totalFlow}\n${A.join(" ")}\n${B.join(" ")}`);
};

print();
