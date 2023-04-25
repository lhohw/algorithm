// 25622: 3에 깃든 힘
import { createInterface } from "readline";

type _Node = {
  key: number;
  parent: _Node;
  adj: number[];
  group: number[];
};

const handleInput = (input: string) => {
  if (n === undefined) {
    init(input);
  } else {
    connect(input);
  }
};

const init = (input: string) => {
  n = +input;
  tree = new Array(n)
    .fill(undefined)
    .map((_, i) => ({ key: i, parent: null!, adj: [], group: [i + 1] }));
};

const connect = (input: string) => {
  const [u, v] = input.split(" ").map((e) => +e - 1);
  tree[u].adj.push(v);
  tree[v].adj.push(u);
};

const solve = () => {
  const stack: _Node[] = getStack();
  while (stack.length) {
    const { parent, group } = stack.pop()!;
    if (group.length > 3) {
      ret = "U";
      return;
    }
    if (group.length === 3) {
      ret += `${group.join(" ")}\n`;
    } else {
      parent.group.push(...group);
    }
  }
};

const getStack = () => {
  const stack1: _Node[] = [tree[0]];
  const stack2: _Node[] = [tree[0]];
  const visited = new Array(n).fill(false);
  while (stack1.length) {
    const root = stack1.pop()!;
    const { key, adj } = root;
    visited[key] = true;
    for (const childKey of adj) {
      if (visited[childKey]) continue;
      const child = tree[childKey];
      child.parent = root;
      stack1.push(child);
      stack2.push(child);
    }
  }
  return stack2;
};

const print = () => console.log(ret.trimEnd());

let n: number;
let ret = "S\n";
let tree: _Node[] = [];
createInterface({
  input: process.stdin,
  output: process.stdout,
})
  .on("line", handleInput)
  .on("close", () => {
    solve();
    print();
    process.exit();
  });
