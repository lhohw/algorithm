// 20040: 사이클 게임
import { createInterface } from "readline";

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
    u = this.find(u);
    v = this.find(v);
    if (u === v) return false;
    if (rank[u] > rank[v]) [u, v] = [v, u];
    parent[u] = v;
    if (rank[u] === rank[v]) rank[v]++;
    return true;
  }
}
let n: number, m: number;
let disjointSet: DisjointSet;
let ret = 0;
let iter = 0;

const handleInput = (input: string) => {
  if (n === undefined || m === undefined) init(input);
  else if (!ret) play(input);
};

const init = (input: string) => {
  [n, m] = input.split(" ").map(Number);
  disjointSet = new DisjointSet(n);
};

const play = (input: string) => {
  const [u, v] = input.split(" ").map(Number);
  iter++;
  if (!disjointSet.merge(u, v)) ret = iter;
};

const print = () => console.log(ret.toString());

createInterface({
  input: process.stdin,
  output: process.stdout,
})
  .on("line", handleInput)
  .on("close", () => {
    print();
    process.exit();
  });
