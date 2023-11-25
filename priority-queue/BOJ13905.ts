// 13905: 세부
import { readFileSync } from "fs";

class PriorityQueue {
  private queue: number[] = [];
  private isInQueue: boolean[];
  constructor(private n: number, public dist: number[]) {
    this.isInQueue = new Array(this.n).fill(false);
  }
  push(node: number) {
    const { queue, isInQueue } = this;
    if (isInQueue[node]) return;
    isInQueue[node] = true;

    queue.push(node);
    let here = this.length() - 1;
    let next = this.parent(here);
    while (here && this.compare(here, next)) {
      this.swap(here, next);
      here = next;
      next = this.parent(here);
    }
  }
  shift() {
    const { queue, isInQueue } = this;
    const ret = this.top();
    isInQueue[ret] = false;

    if (this.length() === 1) return queue.pop()!;

    queue[0] = queue.pop()!;
    let here = 0;
    while (true) {
      const left = here * 2 + 1,
        right = here * 2 + 2;
      if (left >= this.length()) break;
      let next = here;
      if (this.compare(left, next)) next = left;
      if (right < this.length() && this.compare(right, next)) next = right;
      if (next === here) break;
      this.swap(here, next);
      here = next;
    }

    return ret;
  }
  length() {
    const { queue } = this;
    return queue.length;
  }
  top() {
    const { queue } = this;
    return queue[0];
  }
  private parent(here: number) {
    return (here - 1) >> 1;
  }
  private compare(here: number, next: number) {
    const { queue, dist } = this;
    return dist[queue[here]] > dist[queue[next]];
  }
  private swap(here: number, next: number) {
    const { queue } = this;
    [queue[here], queue[next]] = [queue[next], queue[here]];
  }
}
const [[n], [s, e], ...edges] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

const print = () => console.log(solve().toString());

const solve = () => {
  const { pq, adj } = init();
  const { dist } = pq;
  while (pq.length()) {
    const here = pq.shift();
    for (const [there, cost] of adj[here]) {
      const value = Math.min(dist[here], cost);
      if (there === s) continue;
      if (dist[there] < value) {
        dist[there] = value;
        pq.push(there);
      }
    }
  }

  return dist[e];
};

const init = () => {
  const pq = initQueue();
  const adj = initAdj();
  return { pq, adj };
};

const initQueue = () => {
  const dist = new Array(n + 1).fill(0);
  dist[s] = Infinity;
  const pq = new PriorityQueue(n + 1, dist);
  pq.push(s);

  return pq;
};

const initAdj = () => {
  const adj: number[][][] = Array.from({ length: n + 1 }).map(() => []);

  for (const [u, v, w] of edges) {
    adj[u].push([v, w]);
    adj[v].push([u, w]);
  }

  return adj;
};

print();
