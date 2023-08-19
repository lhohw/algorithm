// 2250: 트리의 높이와 너비
import { createInterface } from "readline";

class _Node {
  public level = 0;
  public left?: _Node;
  public right?: _Node;
  public parent?: _Node;
  public size = 1;
  setLeft(left: _Node) {
    this.left = left;
    left.parent = this;
  }
  setRight(right: _Node) {
    this.right = right;
    right.parent = this;
  }
  initialize() {
    this.level = this.parent ? this.parent.level + 1 : 0;
    let size = 1;
    if (this.left) size += this.left.initialize();
    if (this.right) size += this.right.initialize();
    this.size = size;
    return size;
  }
}
class Tree {
  private tree: _Node[];
  private root: _Node = undefined!;
  constructor(private n: number) {
    this.tree = new Array(n).fill(undefined).map(() => new _Node());
  }
  connect(idx: number, left: number, right: number) {
    const { tree } = this;
    if (left !== -2) tree[idx].setLeft(tree[left]);
    if (right !== -2) tree[idx].setRight(tree[right]);
  }
  getRoot() {
    const { tree, root } = this;
    if (root) return this.root;
    let here = tree[0];
    while (here.parent) {
      here = here.parent;
    }
    return (this.root = here);
  }
}
const handleInput = (input: string) => {
  if (n === undefined) {
    init(input);
  } else {
    connect(input);
  }
};
const init = (input: string) => {
  n = +input;
  tree = new Tree(n);
};
const connect = (input: string) => {
  const [idx, left, right] = input.split(" ").map((e) => +e - 1);
  tree.connect(idx, left, right);
};

const print = () => console.log(solve());
const solve = () => {
  const root = tree.getRoot();
  root.initialize();
  const minmax = setMinMax(root, 0, []);
  return getMaxWidth(minmax);
};

const setMinMax = (root: _Node, x: number, minmax: number[][]) => {
  const { level, left, right } = root;
  if (!minmax[level]) minmax[level] = [1e4 + 1, -1];
  minmax[level][0] = Math.min(minmax[level][0], x);
  minmax[level][1] = Math.max(minmax[level][1], x);
  if (left) {
    setMinMax(left, x - ((left.right?.size || 0) + 1), minmax);
  }
  if (right) {
    setMinMax(right, x + ((right.left?.size || 0) + 1), minmax);
  }
  return minmax;
};

const getMaxWidth = (minmax: number[][]) => {
  let maxWidth = -1;
  let maxLevel = -1;
  for (let i = 0; i < minmax.length; i++) {
    const [min, max] = minmax[i];
    const width = max - min + 1;
    if (width > maxWidth) {
      maxWidth = width;
      maxLevel = i + 1;
    }
  }
  return `${maxLevel} ${maxWidth}`;
};

let n: number;
let tree: Tree;
createInterface({
  input: process.stdin,
  output: process.stdout,
})
  .on("line", handleInput)
  .on("close", () => {
    print();
    process.exit();
  });
