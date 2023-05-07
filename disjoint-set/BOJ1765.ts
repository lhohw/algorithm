// 1765: 닭싸움 팀 정하기
import { readFileSync } from "fs";

class DisjointSet {
  private parent: number[];
  private rank: number[];
  constructor(private n: number) {
    this.parent = new Array(n).fill(undefined).map((_, i) => i);
    this.rank = new Array(n).fill(1);
  }
  find(u: number): number {
    const { parent } = this;
    if (parent[u] === u) return u;
    return (parent[u] = this.find(parent[u]));
  }
  merge(u: number, v: number) {
    const { parent, rank } = this;
    if (u === undefined || v === undefined) return;
    u = this.find(u);
    v = this.find(v);
    if (u === v) return;
    if (rank[u] > rank[v]) [u, v] = [v, u];
    parent[u] = v;
    if (rank[u] === rank[v]) rank[v]++;
  }
  count() {
    const { parent } = this;
    return new Set(parent.map((p) => this.find(p))).size;
  }
}

const read = (path: string): [number, number, number[][]] => {
  const [[n], [m], ...relation] = readFileSync(path)
    .toString()
    .trim()
    .split("\n")
    .map((row, rowIdx) =>
      row
        .split(" ")
        .map((e) => (rowIdx < 2 ? +e : e === "E" ? 0 : e === "F" ? 1 : +e - 1))
    );
  return [n, m, relation];
};

const solve = (n: number, m: number, relation: number[][]) => {
  const disjointSet = new DisjointSet(n);
  const enemies: number[][] = new Array(n).fill(undefined).map(() => []);
  for (const [w, u, v] of relation) {
    if (w) disjointSet.merge(u, v);
    else {
      enemies[u].push(v);
      enemies[v].push(u);
    }
  }
  for (let i = 0; i < n; i++) {
    for (const enemy of enemies[i]) {
      for (const friend of enemies[enemy]) {
        disjointSet.merge(friend, i);
      }
    }
  }
  return disjointSet.count();
};

const path = "/dev/stdin";
const [n, m, relation] = read(path);

console.log(solve(n, m, relation).toString());
