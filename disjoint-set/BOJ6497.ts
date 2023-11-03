// 6497: 전력난
import { createInterface } from "readline";

class DisjointSet {
  private parent: number[];
  private rank: number[];
  constructor(private n: number) {
    this.parent = Array.from({ length: n }).map((_, i) => i);
    this.rank = new Array(n).fill(1);
  }
  find(u: number): number {
    const { parent } = this;
    if (parent[u] === u) return u;
    return (parent[u] = this.find(parent[u]));
  }
  merge(u: number, v: number) {
    const { parent, rank } = this;
    u = this.find(u);
    v = this.find(v);

    if (u === v) return false;
    if (rank[u] > rank[v]) [u, v] = [v, u];
    parent[u] = v;
    if (rank[u] === rank[v]) rank[v]++;
    return true;
  }
}
let m: number;
let n: number;
let edges: number[][];
let ret = "";

const handleInput = (input: string) => {
  if (m === undefined && n === undefined) {
    init(input);
    if (m === 0 && n === 0) {
      exit();
    }
  } else {
    n--;
    addEdge(input);
    if (n === 0) {
      solve();
    }
  }
};

const init = (input: string) => {
  [m, n] = input.split(" ").map(Number);
  edges = [];
};

const exit = () => {
  print();
  process.exit();
};

const addEdge = (input: string) => edges.push(input.split(" ").map(Number));

const solve = () => {
  sort();
  ret += save() + "\n";
  cleanUp();
};

const sort = () => {
  edges.sort((a, b) => a[2] - b[2]);
};

const save = () => {
  let saved = 0;
  const disjointSet = new DisjointSet(m);
  for (const [u, v, w] of edges) {
    if (!disjointSet.merge(u, v)) saved += w;
  }
  return saved;
};

const cleanUp = () => {
  [n, m, edges] = new Array(3).fill(undefined);
};

const print = () => console.log(ret.trimEnd());

createInterface({
  input: process.stdin,
  output: process.stdout,
}).on("line", handleInput);
