// B -SNUPTI
(function () {
  class Queue {
    head: _Node = null!;
    tail: _Node = null!;
    size = 0;
    push(node: _Node) {
      if (this.size === 0) this.head = node;
      else this.tail.next = node;
      this.tail = node;
      this.size++;
    }
    shift() {
      const ret = this.head;
      this.size--;
      if (this.size === 0) {
        this.head = null!;
        this.tail = null!;
      } else this.head = this.head.next;
      return ret;
    }
    length() {
      return this.size;
    }
  }
  class _Node {
    key: string;
    children: Map<string, _Node> = new Map();
    cnt = 0;
    next: _Node = null!;
    depth: number;
    constructor(key: string, depth: number) {
      this.key = key;
      this.depth = depth;
    }
  }
  class Trie {
    entry: _Node;
    constructor() {
      this.entry = new _Node("", 0);
    }
    insert(str: string) {
      let here = this.entry;
      for (let i = 0; i < str.length; i++) {
        const key = str[i];
        if (!here.children.has(key))
          here.children.set(key, new _Node(key, here.depth + 1));
        here = here.children.get(key)!;
        here.cnt++;
      }
    }
  }
  const trie = new Trie();
  const readline = require("readline");
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  let n: number, m: number;
  const solve = () => {
    const queue = new Queue();
    queue.push(trie.entry);
    const keyMap = new Map<string, number>();
    const depthMap = new Map<number, { cnt: number; list: Set<string> }>();
    while (queue.length()) {
      const node = queue.shift();
      const { children } = node;
      for (const [key, child] of Array.from(children)) {
        if (keyMap.has(key)) {
          if (keyMap.get(key) !== child.depth) return "NO";
        }
        const { depth, cnt } = child;
        keyMap.set(key, depth);
        if (!depthMap.has(depth)) depthMap.set(depth, { cnt, list: new Set() });
        if (depthMap.get(depth)!.cnt !== cnt) return "NO";
        depthMap.get(depth)?.list.add(key);
        queue.push(child);
      }
    }
    let sum = 1;
    let ret = "YES";
    for (let i = 1; i <= n; i++) {
      const { list } = depthMap.get(i)!;
      sum *= list.size;
      ret += "\n" + Array.from(list).sort().join("");
    }
    if (sum !== m) return "NO";
    return ret;
  };
  rl.on("line", (input: string) => {
    if (n === undefined && m === undefined) {
      [n, m] = input.split(" ").map(Number);
    } else trie.insert(input);
  }).on("close", () => {
    console.log(solve());
    process.exit();
  });
})();
