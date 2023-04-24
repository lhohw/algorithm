// 1761: 정점들의 거리
import { createInterface } from "readline";

type _Node = {
  parent: _Node[];
  adj: number[][];
  depth: number;
  distance: number;
};

const handleInput = (input: string) => {
  if (n === undefined) {
    init(input);
  } else if (edgeCnt !== n - 1) {
    edgeCnt++;
    connect(input);
  } else if (m === undefined) {
    setM(input);
    initTree();
  } else {
    ret += `${getDistance(input)}\n`;
  }
};

const init = (input: string) => {
  n = +input;
  tree = new Array(n).fill(undefined).map(() => ({
    parent: [],
    adj: [],
    depth: 0,
    distance: 0,
  }));
};

const connect = (input: string) => {
  const [u, v, w] = input.split(" ").map((e, i) => +e - Number(i !== 2));
  tree[u].adj.push([v, w]);
  tree[v].adj.push([u, w]);
};

const setM = (input: string) => (m = +input);

const initTree = () => {
  const stack: _Node[] = [];
  stack.push(tree[0]);
  const visited = new Array(n).fill(false);
  visited[0] = true;
  while (stack.length) {
    const here = stack.shift()!;
    const { adj, distance, depth } = here;
    for (const [there, w] of adj) {
      if (visited[there]) continue;
      visited[there] = true;
      const child = tree[there];
      child.depth = depth + 1;
      child.distance = distance + w;
      child.parent[0] = here;
      setAncestor(child);
      stack.push(child);
    }
  }
};

const setAncestor = (child: _Node) => {
  let i = 0;
  while (child.parent[i]?.parent[i]) {
    child.parent[i + 1] = child.parent[i].parent[i];
    i++;
  }
};

const getDistance = (input: string) => {
  const [u, v] = input.split(" ").map((e) => tree[+e - 1]);
  const lca = findCommonAncestor(u, v);
  return u.distance + v.distance - lca.distance * 2;
};

const findCommonAncestor = (u: _Node, v: _Node) => {
  if (u.depth > v.depth) [u, v] = [v, u];
  const gap = v.depth - u.depth;
  let times = Math.floor(Math.log2(gap));
  while (times >= 0) {
    if (u.depth <= v.depth - (1 << times)) {
      v = v.parent[times];
    }
    times--;
  }

  if (u === v) return u;

  times = Math.floor(Math.log2(u.depth));
  while (times >= 0) {
    if (u.parent[times] !== v.parent[times]) {
      u = u.parent[times];
      v = v.parent[times];
    }
    times--;
  }
  return u.parent[0];
};

const print = () => console.log(ret.trimEnd());

let n: number, m: number;
let edgeCnt = 0;
let tree: _Node[];
let ret = "";
createInterface({
  input: process.stdin,
  output: process.stdout,
})
  .on("line", handleInput)
  .on("close", () => {
    print();
    process.exit();
  });
