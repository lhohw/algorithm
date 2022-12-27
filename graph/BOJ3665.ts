// 3665: 최종 순위
import { createInterface } from "readline";

class Graph {
  private n: number = undefined!;
  private m: number = undefined!;
  private ret = "";
  private adj: Set<number>[] = undefined!;
  init(rank: number[]) {
    const { n } = this;
    this.adj = new Array(n).fill(undefined).map(() => new Set());
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        this.adj[rank[i]].add(rank[j]);
      }
    }
  }
  input(input: string) {
    if (this.n === undefined) this.n = +input;
    else if (this.adj === undefined) {
      this.init(input.split(" ").map((e) => +e - 1));
    } else if (this.m === undefined) this.m = +input;
    else {
      const [u, v] = input.split(" ").map((e) => +e - 1);
      this.changeRank(u, v);
      this.m--;
    }
    if (this.m === 0) {
      this.ret += graph.solve() + "\n";
      [this.n, this.m, this.adj] = new Array(3).fill(undefined);
    }
  }
  changeRank(u: number, v: number) {
    const { adj } = this;
    if (adj[u].has(v)) [u, v] = [v, u];
    adj[v].delete(u);
    adj[u].add(v);
  }
  traverse(here: number, visited: boolean[], route: number[]): boolean {
    const { adj } = this;
    if (visited[here] === false) return false;
    if (visited[here]) return true;
    visited[here] = false;
    let flag = true;
    for (const there of Array.from(adj[here])) {
      flag = flag && this.traverse(there, visited, route);
    }
    route.push(here + 1);
    visited[here] = true;
    return flag;
  }
  solve() {
    const { n } = this;
    const visited = new Array(n).fill(undefined);
    const route: number[] = [];
    for (let i = 0; i < n; i++) {
      if (!this.traverse(i, visited, route)) return "IMPOSSIBLE";
    }
    return route.reverse().join(" ");
  }
  print() {
    console.log(this.ret.trimEnd());
  }
}
let t: number;
const graph = new Graph();

createInterface({
  input: process.stdin,
  output: process.stdout,
})
  .on("line", (input) => {
    if (t === undefined) t = +input;
    else graph.input(input);
  })
  .on("close", () => {
    graph.print();
    process.exit();
  });
