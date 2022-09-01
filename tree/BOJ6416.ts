// 6416: 트리인가?
(function() {
  type _Node = {
    key: number;
    parent?: number;
    children: number[];
  }
  const input: number[] = require('fs')
    .readFileSync('/dev/stdin')
    .toString()
    .trim()
    .split(/s+/g)
    .reduce((arr: number[], line: string) => [ ...arr, ...line.split(/\s+/g).map(Number) ], []);
  
  let caseIdx = 0;
  let i = 0;
  const setZero = () => {
    while (input[i] !== 0 && input[i+1] !== 0) i += 2;
  }
  const init = (): Map<number, _Node> | null => {
    const tree = new Map<number, _Node>();
    while (input[i] !== 0 && input[i+1] !== 0) {
      if (input[i] === input[i+1]) {
        setZero();
        return null;
      }
      let u: _Node, v: _Node;
      if (!tree.has(input[i])) {
        u = { key: input[i], children: [], };
        tree.set(u.key, u);
      }
      else u = tree.get(input[i])!;
      if (!tree.has(input[i+1])) {
        v = { key: input[i+1], children: [], };
        tree.set(v.key, v);
      }
      else v = tree.get(input[i+1])!;
  
      if (v.parent) {
        setZero();
        return null;
      }
      v.parent = u.key;
      u.children.push(v.key);
      i += 2;
    }
    return tree;
  }
  const getRoot = (tree: Map<number, _Node>): _Node | null => {
    let root: _Node = null!;
    for (const [ _, node ] of Array.from(tree)) {
      if (!node.parent) {
        if (root) return null;
        root = node;
      }
    }
    return root;
  }
  const dfs = (tree: Map<number, _Node>, root: _Node, visited: Map<number, boolean>): boolean => {
    if (visited.get(root.key)) return false;
    visited.set(root.key, true);
    return root.children.reduce<boolean>(
      (flag, child) => flag = (flag && dfs(tree, tree.get(child)!, visited)),
      true
    );
  }
  const hasUniquePath = (tree: Map<number, _Node>, root: _Node): boolean => {
    const visited = new Map<number, boolean>();
    if (!dfs(tree, root, visited) || (visited.size !== tree.size)) return false;
    return true;
  }
  const isTree = () => {
    const tree = init();
    if (!tree) return false;
    if (tree.size === 0) return true;
    const root = getRoot(tree);
    if (!root) return false;
    if (!hasUniquePath(tree, root)) return false;
    return true;
  }
  let ret = '';
  while (input[i] >= 0 && input[i+1] >= 0) {
    ret += `Case ${++caseIdx} is ${isTree() ? '' : 'not '}a tree.\n`;
    i += 2;
  }
  console.log(ret.trimEnd());
})();