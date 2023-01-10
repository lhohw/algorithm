// 10999: 구간 합 구하기 2
import { createInterface } from "readline";

class FenwickTree {
  private tree1: bigint[];
  private tree2: bigint[];
  constructor(private n: number) {
    // arr[X] - arr[X-1]
    this.tree1 = new Array(n + 1).fill(BigInt(0));
    // Z = X * arr[X] - P[X]
    this.tree2 = new Array(n + 1).fill(BigInt(0));
  }
  update(type: 1 | 2, pos: number, diff: bigint) {
    const { n } = this;
    const tree = this[`tree${type}`];
    while (pos <= n) {
      tree[pos] += diff;
      pos += pos & -pos;
    }
  }
  rangeUpdate(a: number, b: number, diff: bigint) {
    this.update(1, a, diff);
    this.update(1, b + 1, -diff);
    this.update(2, a, diff * BigInt(a - 1));
    this.update(2, b + 1, -diff * BigInt(b));
  }
  sum(type: 1 | 2, pos: number) {
    const tree = this[`tree${type}`];
    let ret = BigInt(0);
    while (pos) {
      ret += tree[pos];
      pos &= pos - 1;
    }
    return ret;
  }
  calc(idx: number) {
    return this.sum(1, idx) * BigInt(idx) - this.sum(2, idx);
  }
  query(a: number, b: number) {
    return this.calc(b) - this.calc(a - 1);
  }
}
let n: number, m: number, k: number;
let i = 0;
let fenwickTree: FenwickTree;
let ret = "";
createInterface({
  input: process.stdin,
  output: process.stdout,
})
  .on("line", (input) => {
    if (n === undefined || m === undefined || k === undefined) {
      [n, m, k] = input.split(" ").map(Number);
      fenwickTree = new FenwickTree(n);
    } else if (i !== n) {
      i++;
      fenwickTree.rangeUpdate(i, i, BigInt(input));
    } else {
      const [flag, a, b, c] = input.split(" ").map(Number);
      if (flag === 1) fenwickTree.rangeUpdate(a, b, BigInt(c));
      else ret += fenwickTree.query(a, b) + "\n";
    }
  })
  .on("close", () => {
    console.log(ret.trimEnd());
    process.exit();
  });
