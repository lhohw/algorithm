// 2042: 구간 합 구하기
import { createInterface } from "readline";

class FenwickTree {
  public tree: bigint[];
  constructor(private n: number) {
    this.tree = new Array(n + 1).fill(BigInt(0));
  }
  update(idx: number, diff: bigint) {
    const { tree, n } = this;
    while (idx <= n) {
      tree[idx] += diff;
      idx += idx & -idx;
    }
  }
  sum(idx: number) {
    const { tree } = this;
    let ret = BigInt(0);
    while (idx) {
      ret += tree[idx];
      idx &= idx - 1;
    }
    return ret;
  }
}
let n: number, m: number, k: number;
let fenwickTree: FenwickTree;
let i = 0;
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
      fenwickTree.update(i, BigInt(input));
    } else {
      const [a, b, c] = input.split(" ");
      if (a === "1")
        fenwickTree.update(
          +b,
          BigInt(c) - (fenwickTree.sum(+b) - fenwickTree.sum(+b - 1))
        );
      else ret += fenwickTree.sum(+c) - fenwickTree.sum(+b - 1) + "\n";
    }
  })
  .on("close", () => {
    console.log(ret.trimEnd());
    process.exit();
  });
