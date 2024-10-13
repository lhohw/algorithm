import { readFileSync } from "fs";

const YES = "YES";
const NO = "NO";

export class Graph {
  private adj: Set<number>[];

  constructor(private n: number, private m: number, private edges: number[][]) {
    this.adj = this.init();
  }

  private init() {
    const { n, edges } = this;
    const adj: Set<number>[] = Array.from({ length: n }).map(() => new Set());

    for (const [u, v] of edges) {
      adj[u].add(v);
      adj[v].add(u);
    }

    return adj;
  }

  getOddCount() {
    return this.adj.reduce((acc, a) => acc + (a.size % 2), 0);
  }

  getStart() {
    const { n, adj } = this;

    for (let i = 0; i < n; i++) {
      if (adj[i].size % 2 === 1) return i;
    }

    return 0;
  }

  getAdj(nodeIdx: number) {
    return Array.from(this.adj[nodeIdx].values());
  }

  removePath(here: number, there: number) {
    const { adj } = this;

    adj[here].delete(there);
    adj[there].delete(here);
  }

  isAllEdgeVisited() {
    return this.adj.every((a) => a.size === 0);
  }
}

export const parseInput = (input: string) => {
  const [[n, m], ...edges] = input
    .split("\n")
    .map((row) => row.split(" ").map(Number));

  return { n, m, edges: edges.map((row) => row.map((e) => --e)) };
};

export const solve = (n: number, m: number, edges: number[][]) => {
  const graph = new Graph(n, m, edges);

  if (!canMakeRoute(graph)) return false;
  if (!isAllConnected(graph)) return false;
  return true;
};

export const canMakeRoute = (graph: Graph) => {
  const oddCount = graph.getOddCount();

  return oddCount === 0 || oddCount === 2;
};

export const isAllConnected = (graph: Graph) => {
  const start = graph.getStart();

  const dfs = (here: number) => {
    for (const there of graph.getAdj(here)) {
      graph.removePath(here, there);
      dfs(there);
    }
  };

  dfs(start);

  return graph.isAllEdgeVisited();
};

export const serialize = (canMake: boolean) => (canMake ? YES : NO);

const print = () => {
  const input = readFileSync("/dev/stdin").toString().trim();
  const { n, m, edges } = parseInput(input);
  const ret = solve(n, m, edges);

  console.log(serialize(ret));
};

print();
