// 11405: 책 구매하기
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
const [[n, m], A, B, ...C] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

const SOURCE = 0,
  SINK = 1;
const MAX = 2 + m + n;
const capacity = new Array(MAX)
  .fill(undefined)
  .map(() => new Array(MAX).fill(0));
const flow = new Array(MAX).fill(undefined).map(() => new Array(MAX).fill(0));
const cost = new Array(MAX).fill(undefined).map(() => new Array(MAX).fill(0));
const adj: number[][] = new Array(MAX).fill(undefined).map(() => []);

const print = () => console.log(solve().toString());

const solve = () => {
  init();
  const ret = networkFlow();
  return ret;
};

const init = () => {
  for (let i = 2; i < 2 + m; i++) {
    capacity[SOURCE][i] = B[i - 2];
    link(SOURCE, i);
  }
  for (let i = 2 + m; i < MAX; i++) {
    capacity[i][SINK] = A[i - (2 + m)];
    link(i, SINK);
  }
  for (let i = 2; i < 2 + m; i++) {
    for (let j = 2 + m; j < MAX; j++) {
      capacity[i][j] = 1 << 30;
      link(i, j);
      cost[i][j] = C[i - 2][j - (2 + m)];
      cost[j][i] = -cost[i][j];
    }
  }
};

const link = (here: number, there: number) => {
  adj[here].push(there);
  adj[there].push(here);
};

const networkFlow = () => {
  let totalFlow = 0;
  while (true) {
    const isInQueue = new Array(MAX).fill(false);
    isInQueue[SOURCE] = true;

    const parent = new Array(MAX).fill(-1);
    const dist = new Array(MAX).fill(Infinity);
    dist[SOURCE] = 0;

    const queue = new Queue();
    queue.push(SOURCE);

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

    if (!isVisited(parent, SINK)) break;

    let amount = 1 << 30;
    for (let i = SINK; i !== SOURCE; i = parent[i]) {
      amount = Math.min(amount, residualCapacity(parent[i], i));
    }
    for (let i = SINK; i !== SOURCE; i = parent[i]) {
      totalFlow += amount * cost[parent[i]][i];
      flow[parent[i]][i] += amount;
      flow[i][parent[i]] -= amount;
    }
  }
  return totalFlow;
};

const isVisited = (parent: number[], node: number) => {
  return parent[node] !== -1;
};

const residualCapacity = (here: number, there: number) => {
  return capacity[here][there] - flow[here][there];
};

print();
