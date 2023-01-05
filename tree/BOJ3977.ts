// 3977: 축구 전술
import { createInterface } from "readline";

type _Node = {
  discovered: number;
  sccId: number;
  adj: number[];
};
class SCC {
  private graph: _Node[];
  private discoveredCounter = 0;
  private sccIdCounter = 0;
  private sccGroup: number[][] = [];
  constructor(private n: number) {
    this.graph = new Array(n).fill(undefined).map(() => ({
      discovered: undefined!,
      sccId: undefined!,
      adj: [],
    }));
  }
  input(input: string) {
    const { graph } = this;
    const [u, v] = input.split(" ").map(Number);
    graph[u].adj.push(v);
  }
  scc(here: number, stack: number[]): number {
    const { graph, sccGroup } = this;
    let ret = (graph[here].discovered = this.discoveredCounter++);
    stack.push(here);
    for (const there of graph[here].adj) {
      const target = graph[there];
      if (target.discovered === undefined)
        ret = Math.min(ret, this.scc(there, stack));
      else if (
        target.discovered < graph[here].discovered &&
        target.sccId === undefined
      )
        ret = Math.min(ret, target.discovered);
    }
    if (ret === graph[here].discovered) {
      let t;
      sccGroup.push([]);
      while (t !== here) {
        t = stack.pop()!;
        graph[t].sccId = this.sccIdCounter;
        sccGroup[this.sccIdCounter].push(t);
      }
      this.sccIdCounter++;
    }
    return ret;
  }
  tarjanScc() {
    const { graph, n } = this;
    for (let i = 0; i < n; i++) {
      if (graph[i].discovered === undefined) this.scc(i, []);
    }
  }
  getDAG(): [boolean[], Set<number>[]] {
    const { n, graph, sccIdCounter } = this;
    const dag = new Array(sccIdCounter)
      .fill(undefined)
      .map(() => new Set<number>());
    const start = new Array(sccIdCounter).fill(true);
    for (let here = 0; here < n; here++) {
      const hereId = graph[here].sccId;
      for (const there of graph[here].adj) {
        const thereId = graph[there].sccId;
        if (hereId === thereId) continue;
        dag[hereId].add(thereId);
        start[thereId] = false;
      }
    }
    return [start, dag];
  }
  dfs(here: number, dag: Set<number>[], visited: boolean[]) {
    let ret = 1;
    visited[here] = true;
    for (const there of Array.from(dag[here])) {
      if (visited[there]) continue;
      ret += this.dfs(there, dag, visited);
    }
    return ret;
  }
  solve() {
    const { sccGroup } = this;
    this.tarjanScc();
    const [start, dag] = this.getDAG();
    let ret: number[] = [];
    const visited = new Array(this.sccIdCounter).fill(false);
    for (let i = 0; i < this.sccIdCounter; i++) {
      if (!start[i]) continue;
      const cnt = this.dfs(i, dag, visited);
      if (cnt === this.sccIdCounter) ret = ret.concat(sccGroup[i]);
    }
    if (!ret.length) return "Confused\n";
    return ret.sort((a, b) => a - b).join("\n") + "\n";
  }
}
let t: number;
let n: number, m: number;
let scc: SCC;
let ret = "";
const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});
rl.on("line", (input) => {
  input = input.trim();
  if (input === "") [n, m] = new Array(2).fill(undefined);
  else if (t === undefined) t = +input;
  else if (n === undefined && m === undefined) {
    [n, m] = input.split(" ").map(Number);
    scc = new SCC(n);
  } else if (m) {
    scc.input(input);
    m--;
    if (m === 0) ret += scc.solve() + "\n";
  }
}).on("close", () => {
  console.log(ret.trimEnd());
  process.exit();
});
