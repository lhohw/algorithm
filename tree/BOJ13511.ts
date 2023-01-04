// 13511: 트리와 쿼리 2
import { createInterface } from "readline";

type _Node = {
  key: number;
  parent: _Node[];
  cost: number[];
  adj: number[][];
  depth: number;
  next?: _Node;
};
class Queue {
  private head: _Node = null!;
  private tail: _Node = null!;
  private size = 0;
  push(node: _Node) {
    if (this.size === 0) this.head = node;
    else this.tail.next = node;
    this.tail = node;
    this.size++;
  }
  shift() {
    this.size--;
    const ret = this.head;
    if (this.size === 0) {
      this.head = null!;
      this.tail = null!;
    } else this.head = this.head.next!;
    return ret;
  }
  length() {
    return this.size;
  }
}
class LCA {
  private tree: _Node[];
  constructor(private n: number) {
    this.tree = new Array(n).fill(undefined).map((_, i) => ({
      key: i,
      parent: new Array(Math.floor(Math.log2(n))).fill(undefined),
      cost: new Array(Math.floor(Math.log2(n))).fill(undefined),
      adj: [],
      depth: 0,
    }));
  }
  input(input: string) {
    const { tree } = this;
    const [u, v, w] = input.split(" ").map((e, i) => +e - Number(i !== 2));
    tree[u].adj.push([v, w]);
    tree[v].adj.push([u, w]);
  }
  makeTree() {
    const { tree, n } = this;
    const queue = new Queue();
    queue.push(tree[0]);
    const visited = new Array(n).fill(false);
    visited[0] = true;
    while (queue.length()) {
      const here = queue.shift();
      for (const [there, cost] of here.adj) {
        if (visited[there]) continue;
        visited[there] = true;
        tree[there].cost[0] = cost;
        tree[there].parent[0] = here;
        tree[there].depth = here.depth + 1;
        let i = 0;
        while (i < Math.floor(Math.log2(here.depth + 1))) {
          tree[there].parent[i + 1] = tree[tree[there].parent[i].key].parent[i];
          tree[there].cost[i + 1] =
            tree[there].cost[i] + tree[tree[there].parent[i].key].cost[i];
          i++;
        }
        queue.push(tree[there]);
      }
    }
  }
  findLCA(u: number, v: number) {
    const { tree } = this;
    if (u === v) return u;
    if (tree[u].depth > tree[v].depth) [u, v] = [v, u];
    let i = Math.floor(Math.log2(tree[v].depth));
    while (tree[u].depth !== tree[v].depth) {
      if (tree[u].depth <= tree[v].depth - (1 << i)) v = tree[v].parent[i].key;
      i--;
    }
    if (u === v) return u;
    for (i = Math.floor(Math.log2(tree[u].depth)); i >= 0; i--) {
      if (tree[u].parent[i] !== tree[v].parent[i]) {
        u = tree[u].parent[i].key;
        v = tree[v].parent[i].key;
      }
    }
    return tree[u].parent[0].key;
  }
  getDistance(lca: number, u: number) {
    const { tree } = this;
    let i = Math.floor(Math.log2(tree[u].depth));
    let ret = 0;
    while (tree[lca].depth !== tree[u].depth) {
      if (tree[lca].depth <= tree[u].depth - (1 << i)) {
        ret += tree[u].cost[i];
        u = tree[u].parent[i].key;
      }
      i--;
    }
    return ret;
  }
  query1(lca: number, u: number, v: number) {
    return this.getDistance(lca, u) + this.getDistance(lca, v);
  }
  query2(lca: number, u: number, v: number, k: number) {
    const { tree } = this;
    const uDiff = tree[u].depth - tree[lca].depth;
    k--;
    if (k <= uDiff) {
      while (k) {
        const bit = k & ~(k - 1);
        k &= k - 1;
        u = tree[u].parent[Math.log2(bit)].key;
      }
      return u;
    }
    k -= uDiff;
    k = tree[v].depth - tree[lca].depth - k;
    while (k) {
      const bit = k & ~(k - 1);
      k &= k - 1;
      v = tree[v].parent[Math.log2(bit)].key;
    }
    return v;
  }
  query(flag: number, u: number, v: number, k?: number) {
    const lca = this.findLCA(u, v);
    if (flag === 1 || k === undefined) return this.query1(lca, u, v);
    return this.query2(lca, u, v, k) + 1;
  }
  solve(input: string) {
    const [flag, u, v, k] = input.split(" ").map(Number);
    return this.query(flag, u - 1, v - 1, k);
  }
}
let n: number, m: number;
let lca: LCA;
let ret = "";
createInterface({
  input: process.stdin,
  output: process.stdout,
})
  .on("line", (input) => {
    if (n === undefined) {
      n = +input;
      lca = new LCA(n);
    } else if (n > 1) {
      lca.input(input);
      n--;
    } else if (m === undefined) {
      m = +input;
      lca.makeTree();
    } else ret += lca.solve(input) + "\n";
  })
  .on("close", () => {
    console.log(ret.trimEnd());
    process.exit();
  });
