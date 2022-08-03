// 25198: 곰곰이의 심부름
(function() {
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  let n, s, c, h;
  let adj = [];
  const ancestorCnt = Math.ceil(Math.log2(1e5));
  class Node {
    constructor(key, depth, children = [], ancestor = new Array(ancestorCnt).fill(undefined)) {
      this.key = key;
      this.depth = depth;
      this.children = children;
      this.ancestor = ancestor;
    }
  }
  const makeTree = () => {
    const tree = new Array(n).fill();
    tree[0] = new Node(0, 0);
    const stack = [ 0 ];
    while (stack.length) {
      const here = stack.pop();
      const node = tree[here];
      for (let i=0; i<adj[here].length; i++) {
        const childKey = adj[here][i];
        if (childKey == node.ancestor[0]?.key) continue;
        const child = new Node(childKey, node.depth + 1);
        tree[childKey] = child;
        node.children.push(child);
        stack.push(childKey);
      }
      if (node.children.length) {
        const ancestor = new Array(ancestorCnt).fill(undefined);
        let idx = 0;
        let parent = node;
        while (parent) {
          ancestor[idx] = parent;
          parent = parent.ancestor[idx++];
        }
        node.children.forEach((child) => child.ancestor = ancestor);
      }
    }
    return tree;
  }
  const findLeastCommonAncestor = (u, v) => {
    if (u.depth > v.depth) [ u, v ] = [ v, u ];
    while (u.depth != v.depth) {
      let degree = 0;
      while (u.depth <= v.ancestor[degree]?.depth) degree++;
      degree--;
      v = v.ancestor[degree];
    }
    if (u == v) return u;
    while (u.ancestor[0] !== v.ancestor[0]) {
      let degree = 0;
      while (u.ancestor[degree] && v.ancestor[degree] && u.ancestor[degree] != v.ancestor[degree]) {
        degree++;
      }
      degree--;
      u = u.ancestor[degree];
      v = v.ancestor[degree];
    }
    return u.ancestor[0];
  }
  const findRoute = (from, to) => {
    const lca = findLeastCommonAncestor(from, to);
    const routeUp = [], routeDown = [];
    while (from != lca) {
      routeUp.push(from.key);
      from = from.ancestor[0];
    }
    routeUp.push(lca.key);
    while (to != lca) {
      routeDown.push(to.key);
      to = to.ancestor[0];
    }
    return [ ...routeUp, ...routeDown.reverse() ];
  }
  const solve = (s, c, h) => {
    const tree = makeTree();
    const route = [
      ...findRoute(tree[s], tree[c]),
      ...findRoute(tree[c], tree[h]).slice(1, )
    ];
    const routeLen = route.length;
    const pos = new Array(n).fill(-1);
    let ret = 0;
    for (let i=0; i<routeLen; i++) {
      const here = route[i];
      ret += routeLen - i - 1;
      if (pos[here] != -1) {
        ret--;
        ret -= pos[here];
        ret -= routeLen - i - 1;
      }
      else pos[here] = i;
    }
    return ret;
  }
  rl.on('line', (input) => {
    if (n === undefined) {
      n = +input;
      adj = new Array(n).fill(undefined).map(_ => []);
    }
    else if (s === undefined) [ s, c, h ] = input.split(' ').map((num) => +num - 1);
    else {
      const [ u, v ] = input.split(' ').map(Number);
      adj[u-1].push(v-1);
      adj[v-1].push(u-1);
    }
  }).on('close', () => {
    const ret = solve(s, c, h);
    console.log(ret.toString());
    process.exit();
  });
})();

// Typescript
// (function() {
//   const readline = require('readline');
//   const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
//   });
//   let n: number, s: number, c: number, h: number;
//   let adj: number[][];
//   const ancestorCnt = Math.ceil(Math.log2(1e5));
//   class Node {
//     constructor(
//       public key: number,
//       public depth: number,
//       public children: Node[] = [],
//       public ancestor = new Array<Node | undefined>(ancestorCnt).fill(undefined),
//     ) {}
//   }
//   const makeTree = (): Node[] => {
//     const tree: Node[] = new Array(n).fill(undefined);
//     tree[0] = new Node(0, 0);
//     const stack: number[] = [ 0 ];
//     while (stack.length) {
//       const here = stack.pop()!;
//       const node = tree[here];
//       for (let i=0; i<adj[here].length; i++) {
//         const childKey = adj[here][i];
//         if (node.ancestor[0] && (childKey == node.ancestor[0].key)) continue;
//         const child = new Node(childKey, node.depth + 1);
//         tree[childKey] = child;
//         node.children.push(child);
//         stack.push(childKey);
//       }
//       if (node.children.length) {
//         const ancestor = new Array<Node | undefined>(ancestorCnt).fill(undefined);
//         let idx = 0;
//         let parent: Node | undefined = node;
//         while (parent) {
//           ancestor[idx] = parent;
//           parent = parent.ancestor[idx++];
//         }
//         node.children.forEach(child => child.ancestor = ancestor);
//       }
//     }
//     return tree;
//   }
//   const findLeastCommonAncestor = (u: Node, v: Node): Node => {
//     if (u.depth > v.depth) [ u, v ] = [ v, u ];
//     while (u.depth != v.depth) {
//       let degree = 0;
//       while (u.depth <= v.ancestor[degree]?.depth!) degree++;
//       degree--;
//       v = v.ancestor[degree]!;
//     }
//     if (u == v) return u;
//     while (u.ancestor[0] !== v.ancestor[0]) {
//       let degree = 0;
//       while (u.ancestor[degree] && v.ancestor[degree] && u.ancestor[degree] != v.ancestor[degree]) {
//         degree++;
//       }
//       degree--;
//       u = u.ancestor[degree]!;
//       v = v.ancestor[degree]!;
//     }
//     return u.ancestor[0]!;
//   }
//   const findRoute = (from: Node, to: Node) => {
//     const lca = findLeastCommonAncestor(from, to);
//     const routeUp: number[] = [], routeDown: number[] = [];
//     while (from != lca) {
//       routeUp.push(from.key);
//       from = from.ancestor[0]!;
//     }
//     routeUp.push(lca.key);
//     while (to != lca) {
//       routeDown.push(to.key);
//       to = to.ancestor[0]!;
//     }
//     return [ ...routeUp, ...routeDown.reverse() ];
//   }
//   const solve = (s: number, c: number, h: number) => {
//     const tree = makeTree();
//     const route = [
//       ...findRoute(tree[s], tree[c]),
//       ...findRoute(tree[c], tree[h]).slice(1, )
//     ];
//     const routeLen = route.length;
//     const pos = new Array(n).fill(-1);
//     let ret = 0;
//     for (let i=0; i<routeLen; i++) {
//       const here = route[i];
//       ret += routeLen - i - 1;
//       if (pos[here] != -1) {
//         ret--;
//         ret -= pos[here];
//         ret -= routeLen - i - 1;
//       }
//       else pos[here] = i;
//     }
//     return ret;
//   }
//   rl.on('line', (input: string) => {
//     if (n === undefined) {
//       n = +input;
//       adj = new Array(n).fill(undefined).map(_ => []);
//     }
//     else if (s === undefined) [ s, c, h ] = input.split(' ').map(num => +num - 1);
//     else {
//       const [ u, v ] = input.split(' ').map(Number);
//       adj[u-1].push(v-1);
//       adj[v-1].push(u-1);
//     }
//   }).on('close', () => {
//     const ret = solve(s, c, h);
//     console.log(ret.toString());
//     process.exit();
//   });
// })();