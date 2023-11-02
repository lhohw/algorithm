// 17352: 여러분의 다리가 되어 드리겠습니다!
import { readFileSync } from "fs";

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

    if (u === v) return;
    if (rank[u] > rank[v]) [u, v] = [v, u];
    parent[u] = v;
    if (rank[u] === rank[v]) rank[v]++;
  }
}
const [[n], ...edges] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

const print = () => console.log(solve().toString());

const solve = () => {
  const disjointSet = new DisjointSet(n);
  for (const [u, v] of edges) {
    disjointSet.merge(u - 1, v - 1);
  }
  const root = disjointSet.find(0);
  const other = Array.from({ length: n })
    .map((_, i) => i)
    .find((idx) => disjointSet.find(idx) !== root)!;
  return `${root + 1} ${other + 1}`;
};

print();
