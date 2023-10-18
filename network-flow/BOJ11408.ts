// 11408: 열혈강호 5
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
const [[n, m], ...tasks] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));
const len = 2 + n + m;
const capacity = Array.from({ length: len }).map(() => new Array(len).fill(0));
const flow = Array.from({ length: len }).map(() => new Array(len).fill(0));
const cost = Array.from({ length: len }).map(() => new Array(len).fill(0));
const adj: number[][] = Array.from({ length: len }).map(() => []);

const MAX = 1 << 30;
const SOURCE = 0;
const SINK = 1;
const print = () => console.log(solve());

const solve = () => {
  init();
  const { totalCost, totalCount } = networkFlow();
  return serialize(totalCount, totalCost);
};

const init = () => {
  for (let i = 0; i < n; i++) {
    const employeeIdx = 2 + i;
    link(SOURCE, employeeIdx);
    const [taskCount, ...taskAndCost] = tasks[i];
    for (let j = 0; j < taskCount; j++) {
      const taskIdx = taskAndCost[2 * j] - 1;
      const taskCost = taskAndCost[2 * j + 1];
      link(employeeIdx, 2 + n + taskIdx);
      cost[employeeIdx][2 + n + taskIdx] = taskCost;
      cost[2 + n + taskIdx][employeeIdx] = -taskCost;
    }
  }

  for (let i = 0; i < m; i++) {
    link(2 + n + i, SINK);
  }
};

const link = (u: number, v: number) => {
  capacity[u][v] = 1;
  adj[u].push(v);
  adj[v].push(u);
};

const networkFlow = () => {
  let totalCount = 0;
  let totalCost = 0;
  while (true) {
    const { isInQueue, queue, dist, parent } = initQueue();
    while (queue.length()) {
      const here = queue.shift();
      isInQueue[here] = false;
      for (const there of adj[here]) {
        if (
          residualCapacity(here, there) > 0 &&
          dist[here] + cost[here][there] < dist[there]
        ) {
          dist[there] = dist[here] + cost[here][there];
          parent[there] = here;
          if (!isInQueue[there]) {
            queue.push(there);
            isInQueue[there] = true;
          }
        }
      }
    }

    if (parent[SINK] === -1) break;

    totalCount++;

    for (let here = SINK; here !== SOURCE; here = parent[here]) {
      totalCost += cost[parent[here]][here];
      flow[parent[here]][here] += 1;
      flow[here][parent[here]] -= 1;
    }
  }
  return { totalCost, totalCount };
};

const initQueue = () => {
  const isInQueue = new Array(len).fill(false);
  isInQueue[SOURCE] = true;

  const queue = new Queue();
  queue.push(SOURCE);

  const dist = new Array(len).fill(MAX);
  dist[SOURCE] = 0;

  const parent = new Array(len).fill(-1);
  parent[SOURCE] = SOURCE;

  return { isInQueue, queue, dist, parent };
};

const residualCapacity = (u: number, v: number) => capacity[u][v] - flow[u][v];

const serialize = (count: number, cost: number) => `${count}\n${cost}`;

print();
