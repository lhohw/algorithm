// 11438: LCA 2
(function () {
  const readline = require("readline");
  type _Node = {
    key: number;
    parent: _Node[];
    depth: number;
  };
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  let n: number, m: number;
  let tree: _Node[];
  let ret = "";
  const MAX = Math.floor(Math.log2(1e5));
  let adj: number[][];
  let visited: boolean[];
  const init = (node: _Node) => {
    visited[node.key] = true;
    adj[node.key].forEach((childKey) => {
      if (visited[childKey]) return;
      const child = tree[childKey];
      child.depth = node.depth + 1;
      child.parent[0] = node;
      let i = 0;
      let parent = node;
      while (parent.parent[i]) {
        child.parent[i + 1] = parent.parent[i];
        parent = child.parent[i + 1];
        i++;
      }
      init(child);
    });
  };
  const findLCA = (u: _Node, v: _Node) => {
    if (u.depth > v.depth) [u, v] = [v, u];
    if (!u.parent[0]) return u.key + 1;
    if (u.depth < v.depth) {
      for (let i = Math.floor(Math.log2(v.depth)); i >= 0; i--) {
        if (v.parent[i] && u.depth <= v.parent[i].depth) v = v.parent[i];
      }
    }
    if (u === v) return u.key + 1;
    for (let i = Math.floor(Math.log2(v.depth)); i >= 0; i--) {
      if (u.parent[i] !== v.parent[i]) {
        u = u.parent[i];
        v = v.parent[i];
      }
    }

    return u.parent[0].key + 1;
  };
  rl.on("line", (input: string) => {
    if (n === undefined) {
      n = +input;
      tree = new Array(n).fill(undefined);
      adj = new Array(n).fill(undefined).map((_) => []);
      visited = new Array(n).fill(false);
    } else if (n - 1) {
      n--;
      const [u, v] = input.split(" ").map((e) => +e - 1);
      if (tree[u] === undefined)
        tree[u] = {
          key: u,
          depth: 0,
          parent: new Array(MAX).fill(undefined),
        };
      if (tree[v] === undefined)
        tree[v] = {
          key: v,
          parent: new Array(MAX).fill(undefined),
          depth: 0,
        };
      adj[u].push(v);
      adj[v].push(u);
    } else if (m === undefined) {
      m = +input;
      init(tree[0]);
    } else {
      const [u, v] = input.split(" ").map((e) => tree[+e - 1]);
      ret += findLCA(u, v) + "\n";
    }
  }).on("close", () => {
    console.log(ret.trimEnd());
    process.exit();
  });
})();
