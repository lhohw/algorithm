import { readFileSync } from "fs";

export class TreapNode {
  count: number;
  nodeCount: number;
  priority: number;
  left: TreapNode | null = null;
  right: TreapNode | null = null;

  constructor(public key: number, count = 1, priority = Math.random()) {
    this.count = count;
    this.nodeCount = count;
    this.priority = priority;
  }

  setLeft(node: TreapNode | null) {
    this.left = node;
    this.setNodeCount();
  }

  setRight(node: TreapNode | null) {
    this.right = node;
    this.setNodeCount();
  }

  setNodeCount() {
    this.nodeCount =
      this.count + this.getLeftNodeCount() + this.getRightNodeCount();
  }

  getLeftNodeCount() {
    return this.left?.nodeCount || 0;
  }

  getRightNodeCount() {
    return this.right?.nodeCount || 0;
  }
}

export class Treap {
  private root: TreapNode | null = null;
  private keySet = new Set<number>();

  getRoot() {
    return this.root;
  }

  push(key: number, count: number, priority?: number) {
    const { root, keySet } = this;

    const _push = (
      root: TreapNode | null,
      node: TreapNode
    ): TreapNode | null => {
      if (root === null) return node;

      root.nodeCount += node.count;

      if (!keySet.has(node.key) && root.priority < node.priority) {
        const [left, right] = this._split(root, node.key);
        node.setLeft(left);
        node.setRight(right);

        return node;
      } else if (root.key === node.key) {
        root.count += node.count;

        if (root.count === 0) {
          return this.delete(root);
        }

        return root;
      }

      if (root.key > node.key) {
        const left = _push(root.left, node);
        root.setLeft(left);
      } else {
        const right = _push(root.right, node);
        root.setRight(right);
      }

      return root;
    };

    this.root = _push(root, new TreapNode(key, count, priority));
    keySet.add(key);
  }

  private _split(
    root: TreapNode | null,
    key: number
  ): [TreapNode | null, TreapNode | null] {
    if (root === null) return [null, null];

    if (root.key < key) {
      const left = root;
      const [rl, rr] = this._split(root.right, key);
      left.setRight(rl);

      return [left, rr];
    } else {
      const right = root;
      const [ll, lr] = this._split(root.left, key);
      right.setLeft(lr);

      return [ll, right];
    }
  }

  /** starts from 1 */
  pop(rank: number) {
    const node = this.nth(rank);
    this.push(node.key, -1);
    return node.key;
  }

  nth(n: number) {
    const _nth = (root: TreapNode, n: number): TreapNode => {
      const rootCnt = root.count;
      const leftCnt = root.getLeftNodeCount();

      if (n <= leftCnt) return _nth(root.left!, n);
      if (n <= leftCnt + rootCnt) return root!;
      return _nth(root.right!, n - leftCnt - rootCnt);
    };

    return _nth(this.root!, n);
  }

  private delete(node: TreapNode): TreapNode | null {
    this.keySet.delete(node.key);
    return this._merge(node.left, node.right);
  }

  private _merge(
    left: TreapNode | null,
    right: TreapNode | null
  ): TreapNode | null {
    if (left === null) return right;
    if (right === null) return left;

    if (left.priority > right.priority) {
      const root = left;
      const rr = this._merge(root.right, right);
      root.setRight(rr);

      return root;
    } else {
      const root = right;
      const ll = this._merge(left, root.left);
      root.setLeft(ll);

      return root;
    }
  }
}

class Commander {
  private treap = new Treap();
  private output: number[] = [];

  handleCommand(command: number[]) {
    const [key, a, b] = command;

    if (key === 1) this.pop(a);
    else this.handle(a, b);
  }

  getOutput() {
    return this.output.join("\n");
  }

  pop(rank: number) {
    const { treap, output } = this;

    const candy = treap.pop(rank);
    output.push(candy);
  }

  handle(flavor: number, count: number) {
    const { treap } = this;

    treap.push(flavor, count);
  }
}
export const parseInput = (input: string) =>
  input.split("\n").map((row) => row.split(" ").map(Number));

export const solve = (params: number[][]) => {
  const [[n], ...commands] = params;
  const commander = new Commander();

  for (let i = 0; i < n; i++) {
    const command = commands[i];
    commander.handleCommand(command);
  }

  return commander.getOutput();
};

const print = () => {
  const input = readFileSync("/dev/stdin").toString().trim();
  const params = parseInput(input);
  const ret = solve(params);

  console.log(ret);
};

print();
