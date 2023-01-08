// 11658: 구간 합 구하기 3
import { createInterface } from "readline";

class FenwickTree {
  private tree: number[][];
  constructor(private n: number) {
    this.tree = new Array(n + 1)
      .fill(undefined)
      .map(() => new Array(n + 1).fill(0));
  }
  update(y: number, x: number, diff: number) {
    const { n, tree } = this;
    while (y <= n) {
      let tmp = x;
      while (tmp <= n) {
        tree[y][tmp] += diff;
        tmp += tmp & -tmp;
      }
      y += y & -y;
    }
  }
  sum(y: number, x: number) {
    const { tree } = this;
    let ret = 0;
    while (y) {
      let tmp = x;
      while (tmp) {
        ret += tree[y][tmp];
        tmp &= tmp - 1;
      }
      y &= y - 1;
    }
    return ret;
  }
  query(y1: number, x1: number, y2: number, x2: number) {
    return (
      this.sum(y2, x2) -
      this.sum(y2, x1 - 1) -
      this.sum(y1 - 1, x2) +
      this.sum(y1 - 1, x1 - 1)
    );
  }
}
let n: number, m: number;
const array: number[][] = [];
let fenwickTree: FenwickTree;
let ret = "";
let idx = 0;
createInterface({
  input: process.stdin,
  output: process.stdout,
})
  .on("line", (input) => {
    if (n === undefined || m === undefined) {
      [n, m] = input.split(" ").map(Number);
      array.push(new Array(n + 1).fill(0));
      fenwickTree = new FenwickTree(n);
    } else if (idx !== n) {
      idx++;
      array.push([0].concat(input.split(" ").map(Number)));
      for (let x = 1; x <= n; x++) fenwickTree.update(idx, x, array[idx][x]);
    } else {
      const [w, y1, x1, y2, x2] = input.split(" ").map(Number);
      if (w === 0) {
        const diff = y2 - array[y1][x1];
        array[y1][x1] = y2;
        fenwickTree.update(y1, x1, diff);
      } else ret += fenwickTree.query(y1, x1, y2, x2) + "\n";
    }
  })
  .on("close", () => {
    console.log(ret.trimEnd());
    process.exit();
  });
