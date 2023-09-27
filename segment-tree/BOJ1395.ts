// 1395: 스위치
import { createInterface } from "readline";

class LazyPropagation {
  private N: number;
  private array: number[];
  private switched: number[];

  constructor(private n: number) {
    this.N = 1 << (Math.ceil(Math.log2(n)) + 1);
    this.array = new Array(this.N).fill(0);
    this.switched = new Array(this.N).fill(0);
  }

  update(left: number, right: number) {
    this._update(left, right, 0, this.n, 1);
  }
  query(left: number, right: number) {
    return this._query(left, right, 0, this.n, 1);
  }
  private _update(
    left: number,
    right: number,
    nodeLeft: number,
    nodeRight: number,
    idx: number
  ): number {
    const { array, switched } = this;
    this.propagate(idx, nodeLeft, nodeRight);
    if (left <= nodeLeft && nodeRight <= right) {
      this.flip(idx, nodeLeft, nodeRight);
      if (!this.isLeaf(nodeLeft, nodeRight)) {
        switched[idx * 2] ^= 1;
        switched[idx * 2 + 1] ^= 1;
      }
      return array[idx];
    }
    if (nodeLeft + 1 === nodeRight) return array[idx];
    if (nodeRight <= left || right <= nodeLeft) return array[idx];

    const nodeMid = (nodeLeft + nodeRight) >> 1;
    return (array[idx] =
      this._update(left, right, nodeLeft, nodeMid, idx * 2) +
      this._update(left, right, nodeMid, nodeRight, idx * 2 + 1));
  }
  private _query(
    left: number,
    right: number,
    nodeLeft: number,
    nodeRight: number,
    idx: number
  ): number {
    const { array } = this;
    this.propagate(idx, nodeLeft, nodeRight);
    if (left <= nodeLeft && nodeRight <= right) return array[idx];
    if (nodeRight <= left || right <= nodeLeft) return 0;

    const nodeMid = (nodeLeft + nodeRight) >> 1;
    return (
      this._query(left, right, nodeLeft, nodeMid, idx * 2) +
      this._query(left, right, nodeMid, nodeRight, idx * 2 + 1)
    );
  }
  private propagate(idx: number, nodeLeft: number, nodeRight: number) {
    const { switched } = this;
    if (!switched[idx]) return;

    this.flip(idx, nodeLeft, nodeRight);
    switched[idx] = 0;
    if (!this.isLeaf(nodeLeft, nodeRight)) {
      switched[idx * 2] ^= 1;
      switched[idx * 2 + 1] ^= 1;
    }
  }
  private isLeaf(nodeLeft: number, nodeRight: number) {
    return nodeLeft + 1 === nodeRight;
  }
  private flip(idx: number, nodeLeft: number, nodeRight: number) {
    const { array } = this;
    const len = nodeRight - nodeLeft;
    array[idx] = len - array[idx];
  }
}

let n: number, m: number;
let ret = "";
let lazyPropagation: LazyPropagation;

const handleInput = (input: string) => {
  if (n === undefined || m === undefined) {
    init(input);
  } else {
    query(input);
  }
};

const init = (input: string) => {
  [n, m] = input.split(" ").map(Number);
  lazyPropagation = new LazyPropagation(n);
};

const query = (input: string) => {
  const [flag, s, t] = input.split(" ").map(Number);
  if (flag === 0) lazyPropagation.update(s - 1, t);
  else ret += `${lazyPropagation.query(s - 1, t)}\n`;
};

const print = () => console.log(ret.trimEnd());

createInterface({
  input: process.stdin,
  output: process.stdout,
})
  .on("line", handleInput)
  .on("close", () => {
    print();
    process.exit();
  });
