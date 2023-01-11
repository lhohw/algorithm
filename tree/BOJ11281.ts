// 11281: 2-SAT - 4
import { createInterface } from "readline";

type _Node = {
  key: number;
  adj: _Node[];
  sccId: number;
  discovered: number;
};
class SCC {
  private tree: _Node[];
  private sccIdCounter = 0;
  private discoverCounter = 0;
  constructor(private n: number) {
    this.tree = new Array(2 * n + 1).fill(undefined).map((_, key) => ({
      key,
      adj: [],
      sccId: undefined!,
      discovered: undefined!,
    }));
  }
  input(input: string) {
    const { tree } = this;
    let [u, v] = input.split(" ").map(Number);
    if (u > v) [u, v] = [v, u];
    if (u > 0 && v > 0) {
      // A || B
      // !A => B
      // !B => A
      tree[2 * u].adj.push(tree[2 * v - 1]);
      tree[2 * v].adj.push(tree[2 * u - 1]);
    } else if (u < 0 && v > 0) {
      u *= -1;
      // !A || B
      // A => B
      // !B => !A
      tree[2 * u - 1].adj.push(tree[2 * v - 1]);
      tree[2 * v].adj.push(tree[2 * u]);
    } else {
      (u *= -1), (v *= -1);
      // !A || !B
      // A => !B
      // B => !A
      tree[2 * u - 1].adj.push(tree[2 * v]);
      tree[2 * v - 1].adj.push(tree[2 * u]);
    }
  }
  scc(here: _Node, stack: _Node[]) {
    const { tree } = this;
    tree[here.key].discovered = this.discoverCounter++;
    stack.push(here);
    let ret = tree[here.key].discovered;
    for (const there of here.adj) {
      if (there.discovered === undefined)
        ret = Math.min(ret, this.scc(there, stack));
      else if (there.discovered < here.discovered && there.sccId === undefined)
        ret = Math.min(ret, there.discovered);
    }
    if (ret === here.discovered) {
      let t: _Node = null!;
      while (t !== here) {
        t = stack.pop()!;
        t.sccId = this.sccIdCounter;
      }
      this.sccIdCounter++;
    }
    return ret;
  }
  tarjanSCC() {
    const { n, tree } = this;
    const stack: _Node[] = [];
    for (let i = 1; i <= 2 * n; i++) {
      if (tree[i].discovered === undefined) this.scc(tree[i], stack);
    }
    for (let i = 1; i <= n; i++) {
      if (tree[2 * i - 1].sccId === tree[2 * i].sccId) return "0";
    }
    const sortedArray = tree
      .slice(1)
      .map((node, idx) => [node.sccId, idx])
      .sort((a, b) => b[0] - a[0]);
    const ret = new Array(n).fill(undefined);
    sortedArray.forEach(([, idx]) => {
      const retIdx = Math.floor(idx / 2);
      const isTrue = idx % 2 === 0;
      if (ret[retIdx] !== undefined) return;
      ret[retIdx] = !isTrue;
    });
    return `1\n${ret.map(Number).join(" ")}`;
  }
}
let n: number, m: number;
let scc: SCC;
createInterface({
  input: process.stdin,
  output: process.stdout,
})
  .on("line", (input) => {
    if (n === undefined || m === undefined) {
      [n, m] = input.split(" ").map(Number);
      scc = new SCC(n);
    } else scc.input(input);
  })
  .on("close", () => {
    console.log(scc.tarjanSCC());
    process.exit();
  });
