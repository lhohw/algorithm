// 4803: 트리
import { createInterface } from "readline";

class DisjointSet {
  private parent: number[];
  private rank: number[];
  constructor(private n: number) {
    this.parent = new Array(n).fill(undefined).map((_, i) => i);
    this.rank = new Array(n).fill(1);
    this.rank[0] = n;
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
    if (u === v) {
      if (u !== 0) this.merge(u, 0);
      return;
    }
    if (rank[u] > rank[v]) [u, v] = [v, u];
    parent[u] = v;
    if (rank[u] === rank[v]) rank[v]++;
  }
  count() {
    return new Set(this.parent.map((node) => this.find(node))).size;
  }
}
let n: number, m: number;
let disjointSet: DisjointSet;
let ret = "";
let caseCount = 0;

const handleInput = (input: string) => {
  if (isEnd(input)) print();
  else if (n === undefined || m === undefined) init(input);
  else if (m) handleEdge(input);
  if (m === 0) solve();
};

const isEnd = (input: string) => {
  const [n, m] = input.split(" ").map(Number);
  return n === 0 && m === 0;
};

const print = () => console.log(ret.trimEnd());

const init = (input: string) => {
  [n, m] = input.split(" ").map(Number);
  disjointSet = new DisjointSet(n + 1);
};

const handleEdge = (input: string) => {
  const [u, v] = input.split(" ").map(Number);
  disjointSet.merge(u, v);
  m--;
};

const solve = () => {
  caseCount++;
  ret += getTreeCount(caseCount) + "\n";
  cleanUp();
};

const getTreeCount = (caseCount: number) => {
  const count = disjointSet.count() - 1;
  if (count === 0) return `Case ${caseCount}: No trees.`;
  if (count === 1) return `Case ${caseCount}: There is one tree.`;
  return `Case ${caseCount}: A forest of ${count} trees.`;
};

const cleanUp = () => {
  [n, m, disjointSet] = new Array(3).fill(undefined);
};

createInterface({
  input: process.stdin,
  output: process.stdout,
}).on("line", handleInput);
