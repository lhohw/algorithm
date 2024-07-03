// 8012: 한동이는 영업사원!
import { createInterface } from "readline";

class _Node {
  public children: number[] = [];
  public depth = 0;
  private parents: _Node[] = new Array(MAX_PARENT).fill(undefined);
  addRoute(route: number) {
    const { children } = this;
    children.push(route);
  }
  init(parent: _Node) {
    const { parents } = this;

    this.depth = parent.depth + 1;
    let p = 0;
    while (parent) {
      parents[p] = parent;
      parent = parent.getParent(p);
      p++;
    }
  }
  getParent(level: number) {
    const { parents } = this;
    return parents[level];
  }
}

let n: number,
  i = 0;
let m: number;
const targets: number[] = [];
let MAX_PARENT: number;
let tree: _Node[];

const handleLine = (line: string) => {
  if (n === undefined) init(line);
  else if (i !== n - 1) addRoute(line);
  else if (m === undefined) setM(line);
  else {
    addTarget(line);
    if (targets.length === m) {
      print();
      close();
    }
  }
};

const splitLine = (line: string) => line.split(" ").map(Number);

const init = (line: string) => {
  [n] = splitLine(line);
  MAX_PARENT = Math.floor(Math.log2(n)) + 1;
  tree = Array.from({ length: n }).map(() => new _Node());
};

const addRoute = (line: string) => {
  const [u, v] = splitLine(line).map((e) => --e);
  tree[u].addRoute(v);
  tree[v].addRoute(u);
  i++;
};

const setM = (line: string) => {
  [m] = splitLine(line);
};

const addTarget = (line: string) => {
  const [target] = splitLine(line).map((e) => --e);
  targets.push(target);
};

const print = () => console.log(solve().toString());

const solve = () => {
  initTree();
  return calculateTime();
};

const initTree = () => {
  const queue: number[] = [];
  const visited = new Array(n).fill(false);

  queue.push(0);
  visited[0] = true;

  let idx = 0;
  while (idx < queue.length) {
    const treeIdx = queue[idx++];
    const root = tree[treeIdx];

    for (let i = 0; i < root.children.length; i++) {
      const child = root.children[i];
      if (visited[child]) continue;

      queue.push(child);
      visited[child] = true;
      tree[child].init(root);
    }
  }
};

const calculateTime = () => {
  let ret = 0;
  let here = tree[0];

  for (let i = 0; i < m; i++) {
    const treeIdx = targets[i];
    const target = tree[treeIdx];
    const lca = getLCA(here, target);
    ret += getDiff(here, lca) + getDiff(lca, target);
    here = target;
  }

  return ret;
};

const getLCA = (here: _Node, target: _Node): _Node => {
  if (here.depth > target.depth) return getLCA(target, here);

  ({ here, target } = syncDepth(here, target));
  const lca = syncPos(here, target);
  return lca;
};

const syncDepth = (here: _Node, target: _Node) => {
  let gap = getDiff(here, target);
  while (gap) {
    const min1 = gap & -gap;
    const p = Math.log2(min1);
    target = target.getParent(p);
    gap ^= min1;
  }

  return { here, target };
};

const syncPos = (here: _Node, target: _Node, p = MAX_PARENT): _Node => {
  if (here === target) return here;

  while (p && here.getParent(p) === target.getParent(p)) p--;
  return syncPos(here.getParent(p), target.getParent(p), p);
};

const getDiff = (here: _Node, there: _Node) => {
  return Math.abs(here.depth - there.depth);
};

const close = () => {
  rl.close();
  process.exit(0);
};

const options = { input: process.stdin, output: process.stdout };
const rl = createInterface(options);
rl.on("line", handleLine);
