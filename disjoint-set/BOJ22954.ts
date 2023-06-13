// 22954: 그래프 트리 분할
import { readFileSync } from "fs";

type _Node = {
  root: number;
  edges: number[];
};
class DisjointSet {
  private parent: number[];
  private rank: number[];
  private edges: number[][];
  constructor(private n: number) {
    this.parent = new Array(n).fill(undefined).map((_, i) => i);
    this.rank = new Array(n).fill(1);
    this.edges = new Array(n).fill(undefined).map(() => []);
  }
  find(u: number): number {
    const { parent } = this;
    if (parent[u] === u) return u;
    return (parent[u] = this.find(parent[u]));
  }
  merge(...[u, v, edgeNumber]: number[]) {
    const { parent, rank, edges } = this;
    u = this.find(u);
    v = this.find(v);
    if (u === v) return false;
    if (rank[u] > rank[v]) [u, v] = [v, u];
    parent[u] = v;
    if (rank[u] === rank[v]) rank[v]++;
    edges[v].push(edgeNumber);
    return true;
  }
  getEdges() {
    const { edges } = this;
    const roots = [];
    for (let i = 1; i <= n; i++) {
      const p = this.find(i);
      if (i === p) {
        roots.push(p);
        continue;
      }
      edges[p].push(...edges[i]);
      edges[i] = [];
    }
    return roots.map<_Node>((root) => ({
      root,
      edges: edges[root],
    }));
  }
  getVertices(root: number) {
    const vertices = [];
    for (let i = 1; i <= n; i++) {
      if (this.find(i) === root) vertices.push(i);
    }
    return vertices.join(" ");
  }
}

const [[n, m], ...Edges] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row, edgeNumber) => [...row.split(" ").map(Number), edgeNumber]);

const print = () => console.log(solve());

const solve = () => {
  if (n <= 2 || n - 2 > m) return "-1";
  return splitGraph(Edges);
};

const splitGraph = (
  edges: number[][],
  edgesForExclude?: number[],
  excludeIdx?: number
): string => {
  const disjointSet = new DisjointSet(n + 1);
  let excludeEdgeNumber = -Infinity;
  if (edgesForExclude && excludeIdx !== undefined) {
    if (excludeIdx === edgesForExclude.length) return "-1";
    if (excludeIdx > 1) return "-1";
    excludeEdgeNumber = edgesForExclude[excludeIdx];
  }
  for (const edge of edges) {
    if (edge[2] === excludeEdgeNumber) continue;
    disjointSet.merge(...edge);
  }
  const MST_edges = disjointSet.getEdges();
  if (MST_edges.length > 2) return "-1";
  if (MST_edges.length === 2) {
    if (MST_edges[0].edges.length === MST_edges[1].edges.length) {
      if (excludeIdx === undefined) return "-1";
      return splitGraph(edges, edgesForExclude, excludeIdx + 1);
    }
    const ret =
      `${MST_edges[0].edges.length + 1} ${MST_edges[1].edges.length + 1}\n` +
      `${disjointSet.getVertices(MST_edges[0].root)}\n` +
      `${MST_edges[0].edges.join(" ")}\n` +
      `${disjointSet.getVertices(MST_edges[1].root)}\n` +
      `${MST_edges[1].edges.join(" ")}`;
    return ret;
  }
  return splitGraph(
    MST_edges[0].edges.map((edgeNumber) => Edges[edgeNumber - 1]),
    MST_edges[0].edges,
    0
  );
};

print();
