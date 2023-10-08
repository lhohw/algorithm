// 1960: 행렬 만들기
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
    this.size--;
    const { key } = this.head;
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
const [[n], rows, columns] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));
const SOURCE = 0;
const SINK = 1;
const len = 2 + 2 * n;
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

const print = () => console.log(solve());

const solve = () => {
  init();
  const totalFlow = dinic();
  if (totalFlow !== reduce(rows) || totalFlow !== reduce(columns)) {
    return "-1";
  }
  return `1\n${serialize()}`;
};

const init = () => {
  for (let i = 0; i < n; i++) {
    capacity[SOURCE][2 + i] = rows[i];
    adj[SOURCE].push(2 + i);
    adj[2 + i].push(SOURCE);
    for (let j = 0; j < n; j++) {
      capacity[2 + i][2 + n + j] = 1;
      capacity[2 + n + j][SINK] = columns[j];

      adj[2 + i].push(2 + n + j);
      adj[2 + n + j].push(2 + i);
    }
    adj[2 + n + i].push(SINK);
    adj[SINK].push(2 + n + i);
  }
};

const dinic = () => {
  let ret = 0;
  while (bfs()) {
    start = new Array(len).fill(0);
    let amount: number;
    while ((amount = dfs(SOURCE, MAX))) {
      ret += amount;
    }
  }
  return ret;
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
  for (let i = start[here]; i < adj[here].length; i++) {
    const there = adj[here][i];
    if (level[there] === level[here] + 1 && residualCapacity(here, there) > 0) {
      amount = Math.min(amount, residualCapacity(here, there));
      const ret = dfs(there, amount);
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

const reduce = (arr: number[]) => arr.reduce((acc, x) => acc + x);

const serialize = () => {
  const ret = new Array(n).fill("");
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      ret[y] += flow[2 + y][2 + n + x];
    }
  }
  return ret.join("\n");
};

print();
