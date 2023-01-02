// 3584: 가장 가까운 공통 조상
import { createInterface } from "readline";

type _Node = {
  key: number;
  parent: _Node[];
  children: _Node[];
  depth: number;
};

class LCA {
  private tree: _Node[];
  constructor(private n: number) {
    this.tree = new Array(n).fill(undefined).map((_, i) => ({
      key: i,
      parent: new Array(Math.ceil(Math.log2(n))).fill(undefined),
      children: [],
      depth: 0,
    }));
  }
  input(input: string) {
    const { tree } = this;
    const [u, v] = input.split(" ").map((e) => +e - 1);
    tree[u].children.push(tree[v]);
    tree[v].parent[0] = tree[u];
  }
  init(root: _Node, depth: number) {
    root.depth = depth;
    let i = 0;
    while (root.parent[i]?.parent[i]) {
      root.parent[i + 1] = root.parent[i].parent[i];
      i++;
    }
    for (const child of root.children) {
      this.init(child, depth + 1);
    }
  }
  solve(input: string) {
    const { tree, n } = this;
    let root = tree[0];
    while (root.parent[0]) root = root.parent[0];
    this.init(root, 0);

    let [u, v] = input.split(" ").map((e) => +e - 1);
    if (tree[u].depth > tree[v].depth) [u, v] = [v, u];
    if (tree[u].depth === 0) return u + 1;
    let i = Math.ceil(Math.log2(n));
    while (tree[u].depth !== tree[v].depth) {
      if (tree[u].depth <= tree[v].depth - (1 << i)) {
        v = tree[v].parent[i].key;
      }
      i--;
    }
    if (u === v) return u + 1;
    for (i = Math.ceil(Math.log2(n)); i >= 0; i--) {
      if (
        tree[u].parent[i] &&
        tree[v].parent[i] &&
        tree[u].parent[i].key !== tree[v].parent[i].key
      ) {
        u = tree[u].parent[i].key;
        v = tree[v].parent[i].key;
      }
    }
    return tree[u].parent[0].key + 1;
  }
}
let t: number;
let n: number;
let lca: LCA;
let ret = "";
createInterface({
  input: process.stdin,
  output: process.stdout,
})
  .on("line", (input) => {
    if (t === undefined) t = +input;
    else if (n === undefined) {
      n = +input;
      lca = new LCA(n);
    } else if (n > 1) {
      lca.input(input);
      n--;
    } else {
      ret += lca.solve(input) + "\n";
      n = undefined!;
      lca = undefined!;
    }
  })
  .on("close", () => {
    console.log(ret.trimEnd());
    process.exit();
  });
