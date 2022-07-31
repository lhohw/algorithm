// 12896: 스크루지 민호
(function() {
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  let n: number;
  let adj: number[][];
  let max: number = 0;
  class Node {
    constructor(
      public key: number,
      public parent: Node | null,
      public children: Node[] = [],
      public height: number = 0,
    ) {}
  }
  const makeTree = () => {
    const tree: Node[] = new Array(n).fill(undefined);
    const root = new Node(0, null);
    tree[0] = root;
    const stack: number[] = [ 0 ];

    const tmp = [ root ];

    while (tmp.length) {
      const root = tmp.pop() as Node;
      const { key, parent } = root;
      const children = adj[key];
      for (let i=0; i<children.length; i++) {
        const childKey = children[i];
        if (childKey == parent?.key) continue;
        const child = new Node(childKey, root);
        root.children.push(child);
        tree[childKey] = child;
        tmp.push(child);
        stack.push(childKey);
      }
    }
    return { stack, tree };
  }
  const calcHeight = (stack: number[], tree: Node[]) => {
    while (stack.length) {
      const root = tree[stack.pop()!];
      const { children } = root;
      if (children.length >= 2) {
        children.sort((a, b) => b.height - a.height);
        max = Math.max(max, children[0].height + children[1].height + 2);
      }
      if (children.length) root.height = children[0].height + 1;
    }
  }
  rl.on('line', (input: string) => {
    if (n === undefined) {
      n = +input;
      adj = new Array(n).fill(undefined).map(_ => []);
    }
    else {
      const [ u, v ] = input.split(' ').map(Number);
      adj[u-1].push(v-1);
      adj[v-1].push(u-1);
    }
  }).on('close', () => {
    const { stack, tree } = makeTree();
    calcHeight(stack, tree);
    max = Math.max(tree[0].height, max);
    console.log(Math.ceil(max / 2).toString());
    process.exit();
  })
})();