import { readFileSync } from "fs";

type PQNode = number;
export class PriorityQueue {
  private pq: PQNode[] = [];
  private isInQueue: boolean[];

  constructor(n: number, private dist: number[]) {
    this.isInQueue = new Array(n).fill(false);
  }

  push(node: number) {
    const { pq } = this;

    if (this.isIn(node)) return;
    this.setIsIn(node, true);

    pq.push(node);

    let here = this.length() - 1;
    let next = this.parent(here);

    while (here && this.compare(here, next)) {
      this.swap(here, next);
      here = next;
      next = this.parent(here);
    }
  }

  pop() {
    const { pq } = this;

    if (this.isEmpty()) throw new Error("queue is empty");
    if (this.length() === 1) return pq.pop()!;

    const ret = this.top();
    this.setIsIn(ret, false);
    pq[0] = pq.pop()!;

    let here = 0;

    while (true) {
      const left = here * 2 + 1,
        right = here * 2 + 2;
      let next = here;

      if (left >= this.length()) break;
      if (this.compare(left, next)) next = left;
      if (right < this.length() && this.compare(right, next)) next = right;
      if (next === here) break;

      this.swap(here, next);
      here = next;
    }

    return ret;
  }

  top() {
    return this.pq[0];
  }

  private isIn(nodeIdx: number) {
    return this.isInQueue[nodeIdx];
  }

  private setIsIn(nodeIdx: number, isIn: boolean) {
    this.isInQueue[nodeIdx] = isIn;
  }

  private compare(here: number, next: number) {
    const { pq, dist } = this;
    const h = pq[here];
    const n = pq[next];

    return dist[h] < dist[n];
  }

  private swap(here: number, next: number) {
    const { pq } = this;

    [pq[here], pq[next]] = [pq[next], pq[here]];
  }

  private parent(here: number) {
    return --here >> 1;
  }

  isEmpty() {
    return this.length() === 0;
  }

  length() {
    return this.pq.length;
  }
}

class Graph {
  private adj: number[][][];

  constructor(private n: number, private m: number, private edges: number[][]) {
    this.adj = Array.from({ length: n }).map(() => []);

    for (let i = 0; i < m; i++) {
      const [_u, _v, w] = edges[i];
      const u = _u - 1;
      const v = _v - 1;

      this.adj[u].push([v, w]);
      this.adj[v].push([u, w]);
    }
  }

  isOut(y: number, x: number) {
    const { n } = this;

    return y < 0 || y >= n || x < 0 || x >= n;
  }

  getAdj(nodeIdx: number) {
    return this.adj[nodeIdx];
  }
}

export const parseInput = (input: string) => {
  return input.split("\n").map((row) => row.split(" ").map(Number));
};

export const solve = (params: number[][]) => {
  const [[n, m], ...edges] = params;
  const dist = new Array<number>(n).fill(1 << 30);
  const pq = new PriorityQueue(n, dist);
  const graph = new Graph(n, m, edges);

  dist[0] = 0;
  pq.push(0);

  const ret = count(n, pq, graph, dist);
  return ret;
};

export const count = (
  n: number,
  pq: PriorityQueue,
  graph: Graph,
  dist: number[]
) => {
  while (!pq.isEmpty()) {
    const here = pq.pop();

    for (const [there, cost] of graph.getAdj(here)) {
      if (dist[there] > dist[here] + cost) {
        dist[there] = dist[here] + cost;
        pq.push(there);
      }
    }
  }

  return dist[n - 1];
};

const print = () => {
  const input = readFileSync("/dev/stdin").toString().trim();
  const params = parseInput(input);
  const ret = solve(params);

  console.log(ret.toString());
};

print();
