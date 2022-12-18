// 15681: 트리와 쿼리
import { createInterface } from "readline";

class Tree {
  private adj: number[][];
  private size: number[];
  constructor(private n: number, private r: number) {
    this.adj = new Array(n).fill(undefined).map(() => []);
    this.size = new Array(n).fill(1);
  }
  input(u: number, v: number) {
    const { adj } = this;
    adj[u].push(v);
    adj[v].push(u);
  }
  query(u: number) {
    const { size } = this;
    return size[u];
  }
  makeTree(root = this.r, visited = new Array(this.n).fill(false)) {
    const { adj, size } = this;
    visited[root] = true;
    for (const child of adj[root]) {
      if (visited[child]) continue;
      this.makeTree(child, visited);
      size[root] += size[child];
    }
  }
}
let n: number, r: number, q: number, i: number;
let tree: Tree;
let ret = "";
createInterface({
  input: process.stdin,
  output: process.stdout,
})
  .on("line", (input) => {
    if (
      n === undefined &&
      r === undefined &&
      q === undefined &&
      i === undefined
    ) {
      [n, r, q] = input.split(" ").map((e, idx) => +e - Number(idx === 1));
      i = n - 1;
      tree = new Tree(n, r);
    } else if (i) {
      i--;
      const [u, v] = input.split(" ").map((e) => +e - 1);
      tree.input(u, v);
      if (i === 0) {
        tree.makeTree();
      }
    } else ret += tree.query(+input - 1) + "\n";
  })
  .on("close", () => {
    console.log(ret.trimEnd());
    process.exit();
  });
