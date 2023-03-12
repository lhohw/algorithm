// 2357: 최솟값과 최댓값
import { createInterface } from "readline";

class SegmentTree {
  private n: number;
  private rmq: number[];
  constructor(private array: number[]) {
    this.n = array.length;
    this.rmq = new Array(1 << (Math.ceil(Math.log2(array.length)) + 1)).fill(0);
    this.init(0, array.length - 1, 1);
  }
  private init(nodeLeft: number, nodeRight: number, node: number): number {
    const { rmq, array } = this;
    if (nodeLeft === nodeRight) {
      return (rmq[node] = array[nodeLeft]);
    }
    const nodeMid = Math.floor((nodeLeft + nodeRight) / 2);
    return (rmq[node] = Math.min(
      this.init(nodeLeft, nodeMid, node * 2),
      this.init(nodeMid + 1, nodeRight, node * 2 + 1)
    ));
  }
  private _query(
    nodeLeft: number,
    nodeRight: number,
    node: number,
    left: number,
    right: number
  ): number {
    const { rmq } = this;
    if (nodeRight < left || right < nodeLeft) return Infinity;
    if (left <= nodeLeft && nodeRight <= right) return rmq[node];
    const nodeMid = Math.floor((nodeLeft + nodeRight) / 2);
    return Math.min(
      this._query(nodeLeft, nodeMid, node * 2, left, right),
      this._query(nodeMid + 1, nodeRight, node * 2 + 1, left, right)
    );
  }
  query(left: number, right: number) {
    return this._query(0, this.n - 1, 1, left - 1, right - 1);
  }
}
let n: number, m: number;
const array: number[] = [];
let rangeMin: SegmentTree;
let rangeMax: SegmentTree;
let ret = "";
createInterface({
  input: process.stdin,
  output: process.stdout,
})
  .on("line", (input) => {
    if (n === undefined || m === undefined) {
      [n, m] = input.split(" ").map(Number);
    } else if (n) {
      array.push(+input);
      n--;
      if (n === 0) {
        rangeMin = new SegmentTree(array);
        rangeMax = new SegmentTree(array.map((e) => -e));
      }
    } else {
      const [a, b] = input.split(" ").map(Number);
      ret += `${rangeMin.query(a, b)} ${-rangeMax.query(a, b)}\n`;
    }
  })
  .on("close", () => {
    console.log(ret.trimEnd());
    process.exit();
  });
