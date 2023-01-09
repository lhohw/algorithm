// 16975: 수열과 쿼리 21
import { createInterface } from "readline";

class FenwickTree {
  private tree: bigint[];
  constructor(private n: number) {
    this.tree = new Array(n + 1).fill(BigInt(0));
  }
  update(pos: number, val: bigint) {
    const { tree, n } = this;
    while (pos <= n) {
      tree[pos] += val;
      pos += pos & -pos;
    }
  }
  sum(pos: number) {
    const { tree } = this;
    let ret = BigInt(0);
    while (pos) {
      ret += tree[pos];
      pos &= pos - 1;
    }
    return ret;
  }
}
let n: number, m: number;
let fenwickTree: FenwickTree;
let ret = "";
createInterface({
  input: process.stdin,
  output: process.stdout,
})
  .on("line", (input) => {
    if (n === undefined) n = +input;
    else if (fenwickTree === undefined) {
      fenwickTree = new FenwickTree(n);
      let prev = BigInt(0);
      input.split(" ").forEach((e, i) => {
        const num = BigInt(e);
        fenwickTree.update(i + 1, num - prev);
        prev = num;
      });
    } else if (m === undefined) m = +input;
    else {
      const [flag, i, j, k] = input.split(" ").map(Number);
      if (flag === 1) {
        const diff = BigInt(k);
        fenwickTree.update(i, diff);
        fenwickTree.update(j + 1, -diff);
      } else ret += fenwickTree.sum(i) + "\n";
    }
  })
  .on("close", () => {
    console.log(ret.trimEnd());
    process.exit();
  });
