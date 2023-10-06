// 5107: 마니또
import { createInterface } from "readline";

class DisjointSet {
  private parent: number[];
  private rank: number[];
  private idx = 0;
  private nameMap = new Map<string, number>();
  constructor(private n: number) {
    this.parent = new Array(n).fill(undefined).map((_, i) => i);
    this.rank = new Array(n).fill(1);
  }
  find(u: number): number {
    const { parent } = this;
    if (parent[u] === u) return u;
    return (parent[u] = this.find(parent[u]));
  }
  merge(_u: string, _v: string) {
    const { nameMap } = this;
    if (!nameMap.has(_u)) nameMap.set(_u, this.idx++);
    if (!nameMap.has(_v)) nameMap.set(_v, this.idx++);

    const u = nameMap.get(_u)!;
    const v = nameMap.get(_v)!;
    return this._merge(u, v);
  }
  private _merge(u: number, v: number) {
    const { parent, rank } = this;
    u = this.find(u);
    v = this.find(v);
    if (u === v) return;
    if (rank[u] > rank[v]) [u, v] = [v, u];
    parent[u] = v;
    if (rank[u] === rank[v]) rank[v]++;
  }
  count() {
    const { parent } = this;
    const set = new Set(parent.map((e) => this.find(e)));
    return set.size;
  }
}
let n: number;
let cnt: number;
let disjointSet: DisjointSet;
const ret: number[] = [];
const handleInput = (input: string) => {
  if (input === "0") return;
  if (n === undefined) {
    init(input);
  } else {
    connect(input);
    cnt++;
    if (n === cnt) {
      ret.push(disjointSet.count());
      cleanUp();
    }
  }
};

const init = (input: string) => {
  n = +input;
  cnt = 0;
  disjointSet = new DisjointSet(n);
};

const connect = (input: string) => {
  const [u, v] = input.split(" ");
  disjointSet.merge(u, v);
};

const cleanUp = () => {
  [n, cnt, disjointSet] = new Array(3);
};

const print = () => console.log(ret.map((e, i) => `${i + 1} ${e}`).join("\n"));

createInterface({
  input: process.stdin,
  output: process.stdout,
})
  .on("line", handleInput)
  .on("close", () => {
    print();
    process.exit();
  });
