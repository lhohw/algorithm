// 1135: 뉴스 전하기
import { readFileSync } from "fs";

type _Node = {
  parent: number;
  children: _Node[];
};
const read = (path: string): [number, number[]] => {
  const [[n], parents] = readFileSync(path)
    .toString()
    .trim()
    .split("\n")
    .map((row) => row.split(" ").map(Number));
  return [n, parents];
};

const init = (n: number, parents: number[]) => {
  const tree: _Node[] = parents.map((parent) => ({
    parent,
    children: [],
  }));
  for (let i = 1; i < n; i++) {
    const parent = parents[i];
    tree[parent].children.push(tree[i]);
  }
  return tree;
};

const print = () => console.log(solve().toString());

const solve = () => {
  const path = "/dev/stdin";
  const [n, parents] = read(path);
  const tree = init(n, parents);
  const ret = traverse(tree, tree[0]);
  return ret;
};

const traverse = (tree: _Node[], here: _Node) => {
  const { children } = here;
  if (!children.length) return 0;
  const cand: number[] = [];
  for (const child of children) {
    cand.push(traverse(tree, child));
  }
  return Math.max(...cand.sort((a, b) => b - a).map((e, i) => e + i + 1));
};

print();
