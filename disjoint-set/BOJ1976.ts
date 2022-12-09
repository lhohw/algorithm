// 1976: 여행 가자
import { createInterface } from "readline";

class DisjointSet {
  parent: number[];
  rank: number[];
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
    if (u === v) return;
    if (rank[u] > rank[v]) [u, v] = [v, u];
    parent[u] = v;
    if (rank[u] === rank[v]) rank[v]++;
  }
  solve(plan: number[]) {
    const p = this.find(plan[0]);
    return plan.reduce(
      (visited, city) => (visited = visited && this.find(city) === p),
      true
    )
      ? "YES"
      : "NO";
  }
}
let n: number, m: number;
let i = 0;
let set: DisjointSet;
const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});
rl.on("line", (input) => {
  if (n === undefined) {
    n = +input;
    set = new DisjointSet(n);
  } else if (m === undefined) m = +input;
  else if (i !== n) {
    input
      .split(" ")
      .map(Number)
      .forEach((u, idx) => {
        if (u === 0) return;
        set.merge(i, idx);
      });
    i++;
  } else {
    console.log(set.solve(input.split(" ").map((e) => +e - 1)));
    rl.close();
  }
});
