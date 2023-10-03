// 1396: 크루스칼의 공
import { createInterface } from "readline";

class Range {
  private done = false;
  constructor(public lo: number, public hi: number) {}
  isDone() {
    const { lo, hi } = this;
    return this.done || (this.done = lo + 1 === hi);
  }
  mid() {
    const { lo, hi } = this;
    return (lo + hi) >> 1;
  }
}
class DisjointSet {
  private parent: number[];
  private size: number[];
  private rank: number[];
  constructor(private n: number) {
    this.parent = new Array(n).fill(undefined).map((_, i) => i);
    this.size = new Array(n).fill(1);
    this.rank = new Array(n).fill(1);
  }
  find(u: number): number {
    const { parent } = this;
    if (parent[u] === u) return u;
    return (parent[u] = this.find(parent[u]));
  }
  merge(u: number, v: number) {
    const { parent, size, rank } = this;
    u = this.find(u);
    v = this.find(v);
    if (u === v) return false;
    if (rank[u] > rank[v]) [u, v] = [v, u];
    parent[u] = v;
    size[v] += size[u];
    if (rank[u] === rank[v]) rank[v]++;
    return true;
  }
  isConnected(u: number, v: number) {
    return this.find(u) === this.find(v);
  }
  getSize(u: number) {
    const { size } = this;
    u = this.find(u);
    return size[u];
  }
}

let n: number;
let m: number;
const edges: number[][] = [];
let q: number;
const queries: number[][] = [];

const handleInput = (input: string) => {
  if (n === undefined || m === undefined) {
    init(input);
  } else if (edges.length !== m) {
    addEdge(input);
  } else if (q === undefined) {
    setQ(input);
  } else if (queries.length !== q) {
    addQuery(input);
  }
};

const init = (input: string) => {
  [n, m] = split(input);
};

const addEdge = (input: string) => {
  const [u, v, c] = split(input);
  edges.push([u - 1, v - 1, c]);
};

const setQ = (input: string) => {
  q = +input;
};

const addQuery = (input: string) => {
  const [u, v] = split(input);
  queries.push([u - 1, v - 1]);
};

const split = (input: string) => input.split(" ").map(Number);

const print = () => console.log(solve());

const solve = () => {
  sortEdges();
  const ret = kruskal();
  return ret;
};

const sortEdges = () => {
  edges.sort((a, b) => a[2] - b[2]);
};

const kruskal = () => {
  const ret = Array.from({ length: q }).map(() => [-1, -1]);
  const ranges = Array.from({ length: q }).map(() => new Range(0, m + 1));
  while (true) {
    const { isRenewed, queryIndicesWith } = initializeMid(ranges);
    if (!isRenewed) break;
    parametricSearch(ret, queryIndicesWith, ranges);
  }
  return serialize(ret);
};

const initializeMid = (ranges: Range[]) => {
  let isRenewed = false;
  const queryIndicesWith: number[][] = Array.from({ length: m + 1 }).map(
    () => []
  );
  for (let queryIdx = 0; queryIdx < q; queryIdx++) {
    const range = ranges[queryIdx];
    if (range.isDone()) continue;

    isRenewed = true;
    const mid = range.mid();
    queryIndicesWith[mid].push(queryIdx);
  }
  return { isRenewed, queryIndicesWith };
};

const parametricSearch = (
  ret: number[][],
  queryIndices: number[][],
  ranges: Range[]
) => {
  const disjointSet = new DisjointSet(n);
  for (let i = 0; i < m; i++) {
    const [u, v, c] = edges[i];
    disjointSet.merge(u, v);
    const usedEdgeCount = i + 1;
    for (const queryIdx of queryIndices[usedEdgeCount]) {
      const [x, y] = queries[queryIdx];
      const range = ranges[queryIdx];
      if (disjointSet.isConnected(x, y)) {
        range.hi = usedEdgeCount;
        ret[queryIdx] = [c, disjointSet.getSize(x)];
      } else {
        range.lo = usedEdgeCount;
      }
    }
  }
};

const serialize = (ret: number[][]) => {
  return ret.map(([c, v]) => (c === -1 ? "-1" : `${c} ${v}`)).join("\n");
};

createInterface({
  input: process.stdin,
  output: process.stdout,
})
  .on("line", handleInput)
  .on("close", () => {
    print();
    process.exit();
  });
