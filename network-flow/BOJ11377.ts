// 11377: 열혈강호 3
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
const [[n, m, k], ...tasks] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

const SOURCE = 0;
const ADDITIONAL = 1;
const SINK = 2;
const len = 3 + n + m;
const MAX = 1 << 30;

const capacity = Array.from({ length: len }).map<number[]>(() =>
  new Array(len).fill(0)
);
const flow = Array.from({ length: len }).map<number[]>(() =>
  new Array(len).fill(0)
);
const adj = Array.from({ length: len }).map<number[]>(() => []);
let level: number[];
let start: number[];

const print = () => console.log(solve().toString());

const solve = () => {
  init();
  return dinic();
};

const init = () => {
  capacity[SOURCE][ADDITIONAL] = k;
  adj[SOURCE].push(ADDITIONAL);
  adj[ADDITIONAL].push(SOURCE);

  for (let i = 0; i < n; i++) {
    capacity[SOURCE][3 + i] = 1;
    adj[SOURCE].push(3 + i);
    adj[3 + i].push(SOURCE);

    capacity[ADDITIONAL][3 + i] = 1;
    adj[ADDITIONAL].push(3 + i);
    adj[3 + i].push(ADDITIONAL);

    const possibleTasks = tasks[i].slice(1);
    for (let taskIdx of possibleTasks) {
      taskIdx--;
      capacity[3 + i][3 + n + taskIdx] = 1;
      adj[3 + i].push(3 + n + taskIdx);
      adj[3 + n + taskIdx].push(3 + i);
    }
  }

  for (let j = 0; j < m; j++) {
    capacity[3 + n + j][SINK] = 1;
    adj[3 + n + j].push(SINK);
    adj[SINK].push(3 + n + j);
  }
};

const dinic = () => {
  let totalFlow = 0;
  while (bfs()) {
    let amount: number;
    start = new Array(len).fill(0);
    while ((amount = dfs(SOURCE, MAX))) {
      totalFlow += amount;
    }
  }
  return totalFlow;
};

const bfs = () => {
  level = new Array(len).fill(-1);
  level[SOURCE] = 0;
  const queue = new Queue();
  queue.push(SOURCE);
  while (queue.length()) {
    const here = queue.shift();
    for (const there of adj[here]) {
      if (level[there] === -1 && residualCapacity(here, there) > 0) {
        level[there] = level[here] + 1;
        queue.push(there);
      }
    }
  }
  return level[SINK] !== -1;
};

const dfs = (here: number, amount: number): number => {
  if (here === SINK) return amount;

  while (start[here] < adj[here].length) {
    const there = adj[here][start[here]];
    if (level[there] === level[here] + 1 && residualCapacity(here, there) > 0) {
      amount = Math.min(amount, residualCapacity(here, there));
      const ret = dfs(there, amount);
      if (ret > 0) {
        flow[here][there] += ret;
        flow[there][here] -= ret;
        return ret;
      }
    }
    start[here]++;
  }
  return 0;
};

const residualCapacity = (here: number, there: number) =>
  capacity[here][there] - flow[here][there];

print();
