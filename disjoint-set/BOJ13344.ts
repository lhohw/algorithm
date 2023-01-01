// 13344: Chess Tournament
import { createInterface } from "readline";

class DisjointSet {
  private parent: number[];
  private rank: number[];
  private adj: number[][];
  constructor(private n: number) {
    this.parent = new Array(n).fill(undefined).map((_, i) => i);
    this.rank = new Array(n).fill(1);
    this.adj = new Array(n).fill(undefined).map(() => []);
  }
  find(u: number): number {
    const { parent } = this;
    if (parent[u] === u) return u;
    return (parent[u] = this.find(parent[u]));
  }
  merge(u: number, v: number) {
    const { parent, rank } = this;
    (u = this.find(u)), (v = this.find(v));
    if (u === v) return false;
    if (rank[u] > rank[v]) [u, v] = [v, u];
    parent[u] = v;
    if (rank[u] === rank[v]) rank[v]++;
    return true;
  }
  command(input: string) {
    const { adj } = this;
    const [u, cmd, v] = input.split(" ").map((e, i) => (i === 1 ? e : +e)) as [
      number,
      string,
      number
    ];
    if (cmd === "=") this.merge(u, v);
    else adj[v].push(u);
  }
  solve() {
    const { n, adj } = this;
    for (let i = 0; i < n; i++) {
      if (i === this.find(i)) continue;
      for (const there of adj[i]) {
        adj[this.find(i)].push(this.find(there));
      }
    }
    const visited = new Array(n).fill(undefined);
    for (let i = 0; i < n; i++) {
      if (i !== this.find(i)) continue;
      if (!this.traverse(i, visited)) return "inconsistent";
    }
    return "consistent";
  }
  traverse(here: number, visited: boolean[]): boolean {
    const { adj } = this;
    here = this.find(here);
    if (visited[here] !== undefined) return visited[here];
    visited[here] = false;
    let ret = true;
    for (const there of adj[here]) {
      ret = ret && this.traverse(this.find(there), visited);
    }
    visited[here] = true;
    return ret;
  }
}
let n: number, m: number;
let set: DisjointSet;
createInterface({
  input: process.stdin,
  output: process.stdout,
})
  .on("line", (input) => {
    if (n === undefined && m === undefined) {
      [n, m] = input.split(" ").map(Number);
      set = new DisjointSet(n);
    } else set.command(input);
  })
  .on("close", () => {
    console.log(set.solve());
    process.exit();
  });
