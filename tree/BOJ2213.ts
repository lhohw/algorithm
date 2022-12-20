// 2213: 트리의 독립집합
import { createInterface } from "readline";

type _Node = {
  key: number;
  children: _Node[];
  value: [number, number];
};
class Tree {
  private tree: _Node[];
  constructor(private n: number, private weight: number[]) {
    this.tree = new Array(n).fill(undefined).map((_, i) => ({
      key: i,
      children: [],
      value: [0, weight[i]],
    }));
  }
  link(u: number, v: number) {
    const { tree } = this;
    tree[u].children.push(tree[v]);
    tree[v].children.push(tree[u]);
  }
  traverse(root: _Node, parent: number) {
    for (const child of root.children) {
      if (child.key === parent) continue;
      this.traverse(child, root.key);
      root.value[0] += Math.max(...child.value);
      root.value[1] += child.value[0];
    }
  }
  reconstruct(
    root: _Node,
    parent: number,
    isParentIncluded: boolean,
    route: number[]
  ) {
    const isRootIncluded = !isParentIncluded && root.value[0] < root.value[1];
    if (isRootIncluded) route.push(root.key + 1);
    for (const child of root.children) {
      if (child.key === parent) continue;
      this.reconstruct(child, root.key, isRootIncluded, route);
    }
  }
  solve() {
    const { tree } = this;
    const root = tree[0];
    this.traverse(root, -1);
    const route: number[] = [];
    this.reconstruct(root, -1, false, route);
    return [Math.max(...root.value), route.sort((a, b) => a - b).join(" ")];
  }
}
let n: number;
let weight: number[];
let tree: Tree;
createInterface({
  input: process.stdin,
  output: process.stdout,
})
  .on("line", (input) => {
    if (n === undefined) n = +input;
    else if (weight === undefined) {
      weight = input.split(" ").map(Number);
      tree = new Tree(n, weight);
    } else {
      const [u, v] = input.split(" ").map((e) => +e - 1);
      tree.link(u, v);
    }
  })
  .on("close", () => {
    console.log(tree.solve().join("\n"));
    process.exit();
  });
